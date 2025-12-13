import React, { useState, useCallback } from 'react';
import SearchInput from './components/SearchInput';
import AnalysisView from './components/AnalysisView';
import { analyzeArtifact, generateHeroImage } from './services/geminiService';
import { AnalysisState } from './types';
import { ScrollText, Github, Landmark, MapPin } from 'lucide-react';

// 全球排名前20的博物馆/美术馆
const TOP_MUSEUMS = [
  { name: '卢浮宫', location: '巴黎, 法国', icon: '🇫🇷' },
  { name: '大英博物馆', location: '伦敦, 英国', icon: '🇬🇧' },
  { name: '大都会艺术博物馆', location: '纽约, 美国', icon: '🇺🇸' },
  { name: '梵蒂冈博物馆', location: '梵蒂冈城', icon: '🇻🇦' },
  { name: '故宫博物院', location: '北京, 中国', icon: '🇨🇳' },
  { name: '艾尔米塔什博物馆', location: '圣彼得堡, 俄罗斯', icon: '🇷🇺' },
  { name: '普拉多博物馆', location: '马德里, 西班牙', icon: '🇪🇸' },
  { name: '乌菲兹美术馆', location: '佛罗伦萨, 意大利', icon: '🇮🇹' },
  { name: '国家美术馆', location: '伦敦, 英国', icon: '🇬🇧' },
  { name: '泰特现代美术馆', location: '伦敦, 英国', icon: '🇬🇧' },
  { name: '奥赛博物馆', location: '巴黎, 法国', icon: '🇫🇷' },
  { name: '中国国家博物馆', location: '北京, 中国', icon: '🇨🇳' },
  { name: '美国自然历史博物馆', location: '纽约, 美国', icon: '🇺🇸' },
  { name: '维多利亚和阿尔伯特博物馆', location: '伦敦, 英国', icon: '🇬🇧' },
  { name: '芝加哥艺术博物馆', location: '芝加哥, 美国', icon: '🇺🇸' },
  { name: '阿姆斯特丹国家博物馆', location: '阿姆斯特丹, 荷兰', icon: '🇳🇱' },
  { name: '东京国立博物馆', location: '东京, 日本', icon: '🇯🇵' },
  { name: '台北故宫博物院', location: '台北, 中国', icon: '🇨🇳' },
  { name: '上海博物馆', location: '上海, 中国', icon: '🇨🇳' },
  { name: '陕西历史博物馆', location: '西安, 中国', icon: '🇨🇳' }
];

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    data: null,
    error: null,
    heroImage: null,
    generatingImage: false,
    sourceMuseum: null,
  });

  const handleSearch = useCallback(async (term: string, keepSourceMuseum: boolean = false) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
      heroImage: null,
      // 如果不是从博物馆点击进来的，清除来源博物馆
      sourceMuseum: keepSourceMuseum ? prev.sourceMuseum : null
    }));

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

      // 2. Image Generation (Only for Artifacts without preset images)
      if (data.resultType === 'ARTIFACT' && data.artifact) {
        // ✅ 如果已经有预设图片（imageUrl 不为空），就不需要生成 AI 图了
        if (data.artifact.imageUrl && data.artifact.imageUrl !== "") {
          console.log(`✅ 使用预设图片，跳过 AI 生成：${data.artifact.imageUrl}`);
          setState(prev => ({
            ...prev,
            generatingImage: false
          }));
        } else {
          // ⚠️ 只有在没有预设图片时才生成 AI 图
          console.log(`🎨 未找到预设图片，开始生成 AI 图...`);
          const heroPrompt = data.artifact.imagePrompts.find(p => p.angle.toLowerCase().includes('front'))?.prompt
            || `High quality museum photography of ${data.artifact.standardName}, ${data.artifact.material}, black background, studio lighting`;

          const imageUrl = await generateHeroImage(heroPrompt);

          setState(prev => ({
            ...prev,
            heroImage: imageUrl,
            generatingImage: false
          }));
        }
      }

    } catch (err: any) {
      let errorMessage = "Failed to analyze input. Please try again.";

      // 检测 API 配额错误
      if (err.message && err.message.includes("429")) {
        errorMessage = "⚠️ API 配额已达上限。请稍后再试，或联系管理员更换 API 密钥。";
      } else if (err.message && err.message.includes("quota")) {
        errorMessage = "⚠️ API 使用配额已用完。请等待配额重置或升级计划。";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
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

  // 从博物馆点击文物时的处理函数
  const handleSearchFromMuseum = useCallback(async (term: string) => {
    // 保存当前的博物馆数据
    const currentMuseum = state.data?.resultType === 'MUSEUM' ? state.data.museum : null;

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
      heroImage: null,
      sourceMuseum: currentMuseum
    }));

    try {
      // 1. Text Analysis (Classify & Analyze)
      const data = await analyzeArtifact(term);

      setState(prev => ({
        ...prev,
        loading: false,
        data,
        sourceMuseum: currentMuseum,
        // Only start generating hero image if it is an ARTIFACT
        generatingImage: data.resultType === 'ARTIFACT'
      }));

      // 2. Image Generation (Only for Artifacts without preset images)
      if (data.resultType === 'ARTIFACT' && data.artifact) {
        // ✅ 如果已经有预设图片（imageUrl 不为空），就不需要生成 AI 图了
        if (data.artifact.imageUrl && data.artifact.imageUrl !== "") {
          console.log(`✅ 使用预设图片，跳过 AI 生成：${data.artifact.imageUrl}`);
          setState(prev => ({
            ...prev,
            generatingImage: false,
            sourceMuseum: currentMuseum
          }));
        } else {
          // ⚠️ 只有在没有预设图片时才生成 AI 图
          console.log(`🎨 未找到预设图片，开始生成 AI 图...`);
          const heroPrompt = data.artifact.imagePrompts.find(p => p.angle.toLowerCase().includes('front'))?.prompt
            || `High quality museum photography of ${data.artifact.standardName}, ${data.artifact.material}, black background, studio lighting`;

          const imageUrl = await generateHeroImage(heroPrompt);

          setState(prev => ({
            ...prev,
            heroImage: imageUrl,
            generatingImage: false,
            sourceMuseum: currentMuseum
          }));
        }
      }

    } catch (err: any) {
      let errorMessage = "Failed to analyze input. Please try again.";

      // 检测 API 配额错误
      if (err.message && err.message.includes("429")) {
        errorMessage = "⚠️ API 配额已达上限。请稍后再试，或联系管理员更换 API 密钥。";
      } else if (err.message && err.message.includes("quota")) {
        errorMessage = "⚠️ API 使用配额已用完。请等待配额重置或升级计划。";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        generatingImage: false,
        sourceMuseum: currentMuseum
      }));
    }
  }, [state.data]);

  // 返回到博物馆页面
  const handleBackToMuseum = useCallback(() => {
    if (state.sourceMuseum) {
      setState(prev => ({
        ...prev,
        data: {
          resultType: 'MUSEUM',
          museum: prev.sourceMuseum!
        },
        heroImage: null,
        generatingImage: false
      }));
    }
  }, [state.sourceMuseum]);

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
           <div className="flex-grow flex flex-col items-center justify-start w-full max-w-7xl mx-auto py-6 md:py-10">
             {/* 搜索框 */}
             <div className="w-full mb-10 md:mb-12">
               <SearchInput
                 onSearch={handleSearch}
                 isLoading={state.loading}
                 error={state.error}
                 onClearError={() => setState(prev => ({...prev, error: null}))}
               />
             </div>

             {/* 博物馆推荐列表 */}
             <div className="w-full">
               <div className="text-center mb-6 md:mb-8">
                 <h2 className="text-2xl md:text-3xl font-serif text-museum-gold mb-3 flex items-center justify-center gap-2 md:gap-3">
                   <Landmark size={24} className="md:w-7 md:h-7" />
                   <span>全球顶级博物馆 / 美术馆</span>
                 </h2>
                 <p className="text-gray-500 text-xs md:text-sm px-4">点击探索世界级文化殿堂的珍贵藏品</p>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                 {TOP_MUSEUMS.map((museum, index) => (
                   <button
                     key={index}
                     onClick={() => handleSearch(museum.name)}
                     className="group relative bg-museum-800/30 border border-museum-700 rounded-lg p-4 md:p-5 text-left transition-all duration-300 hover:bg-museum-800 hover:border-museum-gold/60 hover:shadow-xl hover:-translate-y-1"
                   >
                     <div className="absolute top-2 right-2 md:top-3 md:right-3 text-lg md:text-2xl opacity-70 group-hover:scale-110 transition-transform">
                       {museum.icon}
                     </div>
                     <div className="mt-5 md:mt-6">
                       <h3 className="text-sm md:text-base font-serif text-museum-100 group-hover:text-museum-gold transition-colors mb-1.5 md:mb-2 pr-6 md:pr-8 leading-tight">
                         {museum.name}
                       </h3>
                       <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                         <MapPin size={10} className="md:w-3 md:h-3 flex-shrink-0" />
                         <span className="line-clamp-1">{museum.location}</span>
                       </p>
                     </div>
                   </button>
                 ))}
               </div>
             </div>
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
              onSearchFromMuseum={handleSearchFromMuseum}
              onBackToMuseum={handleBackToMuseum}
              sourceMuseum={state.sourceMuseum}
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