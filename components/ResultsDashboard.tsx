import React, { useState } from 'react';
import { Copy, Check, ExternalLink, RefreshCw, Hash, Tag, Folder, FileText, List, AlignLeft } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Strategy</h2>
          <p className="text-gray-400 text-sm">Generated from {result.sources.length} live search results</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium border border-white/5"
          >
            <RefreshCw className="w-4 h-4" /> New Strategy
          </button>
        </div>
      </div>

      {/* 1. Title Ideas Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {result.strategy.title_ideas.map((title, idx) => (
          <div key={idx} className="bg-vibe-card border border-white/10 hover:border-vibe-primary/50 p-5 rounded-xl transition-all group relative">
            <div className="text-xs font-bold text-vibe-primary uppercase mb-2 tracking-wider">Option 0{idx + 1}</div>
            <p className="text-lg font-medium text-white leading-snug">{title}</p>
            <button 
              onClick={() => copyToClipboard(title, `title-${idx}`)}
              className="absolute top-4 right-4 p-2 bg-black/40 rounded-lg text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === `title-${idx}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Outline & Intro (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* First Paragraph Card */}
          <div className="bg-vibe-card border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-vibe-accent" /> 
                First Paragraph (Hook)
              </h3>
              <button 
                onClick={() => copyToClipboard(result.strategy.first_paragraph, 'intro')}
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                {copiedField === 'intro' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <div className="p-6 text-gray-300 leading-relaxed text-lg font-serif">
              {result.strategy.first_paragraph}
            </div>
          </div>

          {/* Outline Card */}
          <div className="bg-vibe-card border border-white/10 rounded-xl overflow-hidden">
             <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <List className="w-4 h-4 text-vibe-success" /> 
                SEO Content Outline
              </h3>
              <button 
                onClick={() => copyToClipboard(result.strategy.outline.join('\n'), 'outline')}
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                {copiedField === 'outline' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy All
              </button>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.strategy.outline.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                     <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-vibe-primary flex-shrink-0" />
                     <span className={`${item.toLowerCase().includes('h2') || !item.includes(':') ? 'font-semibold text-white' : 'text-gray-400'}`}>
                       {item.replace(/^H[1-6]:\s*/, '')}
                     </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Metadata & Tags (1/3 width) */}
        <div className="space-y-6">
          
          {/* Meta Description */}
          <div className="bg-vibe-card border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Meta Description
            </h3>
            <div className="p-3 bg-black/30 rounded-lg border border-white/5 text-sm text-gray-300 leading-relaxed mb-2">
              {result.strategy.meta_description}
            </div>
            <div className="text-right text-[10px] text-gray-600">
              {result.strategy.meta_description.length} chars
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-vibe-card border border-white/10 rounded-xl p-6">
             <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4" /> Target Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.strategy.target_keywords.map((k, i) => (
                <span key={i} className="px-3 py-1.5 rounded bg-vibe-primary/10 text-vibe-primary text-xs border border-vibe-primary/20">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Categories & Tags */}
          <div className="bg-vibe-card border border-white/10 rounded-xl p-6">
             <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
              <Folder className="w-4 h-4" /> Categories & Tags
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-500 block mb-2">Suggested Categories</span>
                <div className="flex flex-wrap gap-2">
                  {result.strategy.categories.map((c, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/5 text-gray-300 text-xs border border-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-2">Tags</span>
                <div className="flex flex-wrap gap-2">
                   {result.strategy.tags.map((t, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

           {/* Sources */}
           {result.sources.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Sources Analyzed</h4>
                <div className="flex flex-col gap-2">
                    {result.sources.slice(0, 5).map((source, idx) => (
                        <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-gray-400 hover:text-vibe-primary transition-colors truncate"
                        >
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{source.title}</span>
                        </a>
                    ))}
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;