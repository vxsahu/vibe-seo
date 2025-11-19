import React from 'react';
import { Loader2, Search, Brain, FileText } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-vibe-accent blur-xl opacity-20 animate-pulse"></div>
        <div className="relative bg-vibe-card border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md text-center">
          <Loader2 className="w-12 h-12 text-vibe-primary animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Drafting Strategy...</h3>
          <p className="text-gray-400 text-sm mb-6">
            Reading top results, identifying content gaps, and structuring your outline.
          </p>
          
          <div className="w-full space-y-3">
            <div className="flex items-center text-xs text-gray-500 gap-3">
              <Search className="w-4 h-4 text-vibe-accent animate-bounce" style={{ animationDelay: '0s' }} />
              <span>Analyzing SERP competitors</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-3">
              <Brain className="w-4 h-4 text-vibe-success animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span>Generating hook & 3 title options</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-3">
              <FileText className="w-4 h-4 text-yellow-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              <span>Structuring SEO outline & tags</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;