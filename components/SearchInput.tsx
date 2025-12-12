import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchInputProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <div className="inline-block p-3 rounded-full bg-museum-800/50 border border-museum-700 mb-4">
            <Sparkles className="text-museum-gold" size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-museum-100 tracking-tight">
          Digital Curator
        </h1>
        <p className="text-xl text-museum-gold/80 font-serif italic">
          Explore history through the lens of AI
        </p>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Enter the name of any artifact—Ancient Chinese Bronze, Renaissance Sculpture, or forgotten relic—to generate a museum-grade curation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-museum-gold to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isLoading ? 'animate-pulse' : ''}`}></div>
        <div className="relative flex items-center bg-museum-900 rounded-lg border border-museum-700 shadow-2xl overflow-hidden">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. 中国国家博物馆, 司母戊鼎, Rosetta Stone..."
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

      {/* Suggested chips */}
      <div className="flex flex-wrap justify-center gap-2 opacity-60 text-xs">
          {[
            "中国国家博物馆", 
            "故宫博物院", 
            "大英博物馆", 
            "卢浮宫", 
            "大都会艺术博物馆", 
            "越王勾践剑", 
            "Rosetta Stone"
          ].map(s => (
              <button key={s} onClick={() => { setTerm(s); onSearch(s); }} className="hover:text-museum-gold transition-colors underline decoration-dotted">
                  {s}
              </button>
          ))}
      </div>
    </div>
  );
};

export default SearchInput;