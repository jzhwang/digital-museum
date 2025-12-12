import React, { useState, useCallback } from 'react';
import SearchInput from './components/SearchInput';
import AnalysisView from './components/AnalysisView';
import { analyzeArtifact, generateHeroImage } from './services/geminiService';
import { AnalysisState } from './types';
import { ScrollText, Github } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    data: null,
    error: null,
    heroImage: null,
    generatingImage: false,
  });

  const handleSearch = useCallback(async (term: string) => {
    setState(prev => ({ ...prev, loading: true, error: null, data: null, heroImage: null }));

    try {
      // 1. Text Analysis (Classify & Analyze)
      const data = await analyzeArtifact(term);
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        data,
        // Only start generating hero image if it is an ARTIFACT
        generatingImage: data.resultType === 'ARTIFACT' 
      }));

      // 2. Image Generation (Only for Artifacts)
      if (data.resultType === 'ARTIFACT' && data.artifact) {
         // Use the frontal prompt or a constructed one for the "Hero" shot
        const heroPrompt = data.artifact.imagePrompts.find(p => p.angle.toLowerCase().includes('front'))?.prompt 
          || `High quality museum photography of ${data.artifact.standardName}, ${data.artifact.material}, black background, studio lighting`;
        
        const imageUrl = await generateHeroImage(heroPrompt);
        
        setState(prev => ({
          ...prev,
          heroImage: imageUrl,
          generatingImage: false
        }));
      }

    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || "Failed to analyze input. Please try again.",
        generatingImage: false
      }));
    }
  }, []);

  const handleGenerateAngle = useCallback(async (index: number) => {
    setState(prev => {
      if (!prev.data || prev.data.resultType !== 'ARTIFACT' || !prev.data.artifact) return prev;
      
      const newArtifact = { ...prev.data.artifact };
      const newPrompts = [...newArtifact.imagePrompts];
      newPrompts[index] = { ...newPrompts[index], isLoading: true };
      newArtifact.imagePrompts = newPrompts;

      return { ...prev, data: { ...prev.data, artifact: newArtifact } };
    });

    try {
        if (!state.data || state.data.resultType !== 'ARTIFACT' || !state.data.artifact) return;
        const promptItem = state.data.artifact.imagePrompts[index];
        if (!promptItem) return;

        const url = await generateHeroImage(promptItem.prompt);

        setState(prev => {
            if (!prev.data || prev.data.resultType !== 'ARTIFACT' || !prev.data.artifact) return prev;
            
            const newArtifact = { ...prev.data.artifact };
            const newPrompts = [...newArtifact.imagePrompts];
            newPrompts[index] = { ...newPrompts[index], imageUrl: url || undefined, isLoading: false };
            newArtifact.imagePrompts = newPrompts;

            return { ...prev, data: { ...prev.data, artifact: newArtifact } };
        });
    } catch (error) {
        console.error("Failed to generate angle image", error);
        setState(prev => {
            if (!prev.data || prev.data.resultType !== 'ARTIFACT' || !prev.data.artifact) return prev;
            
            const newArtifact = { ...prev.data.artifact };
            const newPrompts = [...newArtifact.imagePrompts];
            newPrompts[index] = { ...newPrompts[index], isLoading: false };
            newArtifact.imagePrompts = newPrompts;

            return { ...prev, data: { ...prev.data, artifact: newArtifact } };
        });
    }
  }, [state.data]);

  return (
    <div className="min-h-screen bg-museum-900 text-museum-50 selection:bg-museum-gold selection:text-black font-sans flex flex-col">
      
      {/* Navigation / Header */}
      <nav className="w-full p-6 flex justify-between items-center border-b border-museum-800">
        <div className="flex items-center gap-2 text-museum-gold">
          <ScrollText size={24} />
          <span className="font-serif font-bold tracking-widest hidden sm:inline">MUSEUM.AI</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>POWERED BY GEMINI 2.5</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full">
        
        {!state.data && !state.loading && (
           <div className="flex-grow flex items-center justify-center w-full min-h-[60vh]">
             <SearchInput onSearch={handleSearch} isLoading={state.loading} />
           </div>
        )}

        {state.loading && (
          <div className="flex flex-col items-center justify-center space-y-6 min-h-[50vh] animate-fadeIn">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-museum-gold animate-spin"></div>
              <div className="absolute inset-0 h-24 w-24 rounded-full border-r-2 border-l-2 border-museum-700 animate-spin-reverse opacity-50"></div>
            </div>
            <p className="text-museum-gold font-serif text-xl tracking-widest animate-pulse">
              Consulting Archives...
            </p>
            <p className="text-xs text-gray-500">Synthesizing historical records & visual data</p>
          </div>
        )}

        {state.error && (
          <div className="text-center space-y-4 max-w-lg mx-auto bg-red-900/10 border border-red-900/30 p-8 rounded-lg">
            <h3 className="text-red-400 font-serif text-2xl">Entry Not Found</h3>
            <p className="text-gray-400">{state.error}</p>
            <button 
              onClick={() => setState(prev => ({...prev, error: null}))}
              className="text-museum-gold underline hover:text-white transition-colors"
            >
              Try Another Search
            </button>
          </div>
        )}

        {state.data && !state.loading && (
          <div className="w-full animate-slideUp">
            <div className="mb-8">
               <button 
                onClick={() => setState(prev => ({...prev, data: null, heroImage: null}))}
                className="flex items-center gap-2 text-gray-500 hover:text-museum-gold transition-colors mb-4"
               >
                 ← New Curator Request
               </button>
            </div>
            <AnalysisView 
              data={state.data} 
              heroImage={state.heroImage} 
              isGeneratingImage={state.generatingImage} 
              onGenerateAngle={handleGenerateAngle}
              onSearch={handleSearch}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-600 text-xs border-t border-museum-800">
        <p>&copy; {new Date().getFullYear()} 由Jessica制作</p>
        <p className="mt-2 opacity-50">Content generated by AI may contain inaccuracies. Cross-reference with academic sources.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .animate-spin-reverse { animation: spin-reverse 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;