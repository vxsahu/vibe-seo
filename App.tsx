import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { generateContentStrategy } from './services/geminiService';
import { AnalysisResult, AppState } from './types';
import LoadingState from './components/LoadingState';
import ResultsDashboard from './components/ResultsDashboard';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    setState(AppState.LOADING);
    setError(null);
    
    try {
      const data = await generateContentStrategy(keywords);
      setResult(data);
      setState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate strategy. Please try again.");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setKeywords('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-vibe-dark text-white selection:bg-vibe-primary selection:text-white font-sans">
      {/* Header Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-vibe-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
             <div className="w-8 h-8 bg-gradient-to-br from-vibe-primary to-vibe-accent rounded-lg flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-white" />
             </div>
             <span className="font-bold text-xl tracking-tight">SEO Vibe Engine</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">
          
          {state === AppState.IDLE && (
            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  Rank #1 Faster.
                </h1>
                <p className="text-lg text-gray-400 max-w-lg mx-auto">
                  Enter your topic. We'll analyze Google results and generate a complete Content Strategy: titles, outline, intro, and tags.
                </p>
              </div>

              <form onSubmit={handleSearch} className="relative group w-full max-w-xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-vibe-primary to-vibe-accent rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative flex items-center bg-vibe-card border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="pl-6">
                    <Search className="w-6 h-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., 'how to start a podcast'"
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 py-5 px-4 text-lg text-white placeholder-gray-600"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    disabled={!keywords.trim()}
                    className="mr-2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="flex gap-4 justify-center text-sm text-gray-500 pt-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Live SERP Analysis</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Smart Outlines</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Engaging Hooks</span>
              </div>
            </div>
          )}

          {state === AppState.LOADING && <LoadingState />}

          {state === AppState.ERROR && (
            <div className="w-full max-w-md text-center space-y-4 p-8 bg-red-500/5 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="text-xl font-bold text-red-400">Analysis Failed</h3>
              <p className="text-gray-400">{error}</p>
              <button 
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {state === AppState.SUCCESS && result && (
            <ResultsDashboard result={result} onReset={handleReset} />
          )}

        </main>

        <footer className="py-6 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} SEO Vibe Engine. Powered by Gemini 2.5 Flash.
        </footer>
      </div>
    </div>
  );
};

export default App;