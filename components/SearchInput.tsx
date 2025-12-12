import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchInputProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading, error, onClearError }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
      <div className="space-y-3">
        <h1 className="text-5xl md:text-7xl font-serif text-museum-100 tracking-tight flex items-center justify-center gap-4">
          <Sparkles className="text-museum-gold" size={40} />
          Digital Curator
        </h1>
        <p className="text-lg text-museum-gold/80 font-serif italic">
          Explore history through the lens of AI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-museum-gold to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isLoading ? 'animate-pulse' : ''}`}></div>
        <div className="relative flex items-center bg-museum-900 rounded-lg border border-museum-700 shadow-2xl overflow-hidden">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="输入博物馆或文物名称..."
            disabled={isLoading}
            className="w-full bg-transparent text-museum-50 px-6 py-4 text-lg focus:outline-none placeholder-gray-600 font-serif"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-museum-800 hover:bg-museum-700 text-museum-gold border-l border-museum-700 transition-colors flex items-center gap-2 font-bold tracking-widest text-sm uppercase"
          >
            {isLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Search size={20} />
            )}
            {isLoading ? 'Curating...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg text-center animate-fadeIn">
          <p className="text-red-400 text-sm">{error}</p>
          {onClearError && (
            <button
              onClick={onClearError}
              className="text-museum-gold underline hover:text-white transition-colors mt-2 text-xs"
            >
              重新尝试
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;