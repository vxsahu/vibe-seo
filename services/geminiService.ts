import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, ContentStrategy, SearchSource } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateContentStrategy = async (keywords: string): Promise<AnalysisResult> => {
  const modelId = 'gemini-2.5-flash';

  const prompt = `
    You are the "SEO Vibe Engine", an elite Content Strategist.
    
    Task:
    1. Search Google for the provided keywords: "${keywords}".
    2. Analyze top-ranking content for structure, hooks, and gaps.
    3. Compile a complete SEO content strategy.

    Output Requirements (JSON ONLY):
    1. title_ideas: Array of 3 highly engaging, SEO-optimized titles (mix of listicle, how-to, or curiosity-driven).
    2. meta_description: 140-160 chars, high CTR.
    3. target_keywords: Array of 5-8 LSI/semantic keywords found in top results.
    4. categories: Array of 2-3 relevant blog categories.
    5. tags: Array of 5 relevant tags.
    6. outline: An array of strings representing the header structure (H2s and H3s). Make it comprehensive.
    7. first_paragraph: A complete, engaging first paragraph (50-80 words) that hooks the reader immediately and includes the primary keyword naturally.

    Output Format (Strict JSON, No Markdown):
    {
      "title_ideas": ["Title 1", "Title 2", "Title 3"],
      "meta_description": "String",
      "target_keywords": ["Keyword 1", "Keyword 2"],
      "categories": ["Cat 1", "Cat 2"],
      "tags": ["Tag 1", "Tag 2"],
      "outline": ["H2: Introduction", "H2: Main Point", "H3: Detail"],
      "first_paragraph": "String"
    }
  `;

  // Reduced retries to 3 to improve perceived speed while maintaining some robustness
  const maxRetries = 3;
  let currentAttempt = 0;
  let lastError: any;

  while (currentAttempt <= maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          // responseMimeType not supported with googleSearch
        },
      });

      let text = response.text;
      if (!text) throw new Error("No response text generated");

      // Sanitize Markdown
      text = text.trim();
      if (text.startsWith('```json')) {
          text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (text.startsWith('```')) {
          text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const strategy: ContentStrategy = JSON.parse(text);

      // Extract Sources
      const sources: SearchSource[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        chunks.forEach((chunk) => {
          if (chunk.web) {
            sources.push({
              title: chunk.web.title || 'Unknown Source',
              uri: chunk.web.uri || '#'
            });
          }
        });
      }

      return { strategy, sources };

    } catch (error: any) {
      console.warn(`Attempt ${currentAttempt + 1} failed:`, error);
      lastError = error;
      
      const errorCode = error.status || error.code || (error.error && error.error.code);
      const errorMessage = error.message || (error.error && error.error.message) || JSON.stringify(error);
      
      const isOverloaded = 
        errorCode === 503 || 
        errorCode === 429 || 
        errorMessage.includes('overloaded') || 
        errorMessage.includes('UNAVAILABLE');

      if (isOverloaded && currentAttempt < maxRetries) {
        // Faster backoff: 1s, 2s, 4s
        const backoff = 1000 * Math.pow(2, currentAttempt);
        await delay(backoff);
        currentAttempt++;
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Strategy generation failed. Please try again.");
};