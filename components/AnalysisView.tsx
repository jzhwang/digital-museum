import React, { useState, useEffect } from 'react';
import { AnalysisResult, MuseumData } from '../types';
import { Landmark, Calendar, PenTool, User, MapPin, Eye, Camera, Info, ImagePlus, Loader2, RefreshCw, ChevronRight, ArrowLeft } from 'lucide-react';

interface AnalysisViewProps {
  data: AnalysisResult;
  heroImage: string | null;
  isGeneratingImage: boolean;
  onGenerateAngle: (index: number) => void;
  onSearch: (term: string) => void;
  onSearchFromMuseum: (term: string) => void;
  onBackToMuseum: () => void;
  sourceMuseum?: MuseumData | null;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({
  data,
  heroImage,
  isGeneratingImage,
  onGenerateAngle,
  onSearch,
  onSearchFromMuseum,
  onBackToMuseum,
  sourceMuseum
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  // Reset error state when data changes (new search result)
  useEffect(() => {
    setImgError(false);
  }, [data]);
  
  // -- MUSEUM VIEW MODE --
  if (data.resultType === 'MUSEUM' && data.museum) {
    const m = data.museum;
    const showImage = m.imageUrl && !imgError;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-fadeIn pb-20">
            {/* Museum Header */}
            <header className="text-center space-y-4 border-b border-museum-700 pb-8">
                <div className="inline-flex items-center justify-center p-3 bg-museum-800 rounded-full mb-4 border border-museum-gold/30">
                    <Landmark size={32} className="text-museum-gold" />
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
                {m.name}
                </h1>
                <div className="flex justify-center items-center gap-2 text-museum-gold/80 uppercase tracking-widest text-sm font-sans">
                    <MapPin size={14} /> {m.location}
                </div>
                
                {/* Museum Image with Error Handling */}
                {showImage && (
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-museum-700 mt-6 shadow-2xl">
                        <img 
                            src={m.imageUrl} 
                            alt={m.name} 
                            className="w-full h-full object-cover" 
                            onError={() => setImgError(true)}
                        />
                        {m.imageSource && <div className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded text-white/70">{m.imageSource}</div>}
                    </div>
                )}
                
                <p className="max-w-3xl mx-auto text-lg text-gray-400 font-light leading-relaxed mt-6">
                    {m.intro}
                </p>
            </header>

            {/* Treasures List */}
            <section>
                <h2 className="text-2xl font-serif text-museum-gold mb-8 text-center flex items-center justify-center gap-3">
                    <span>❖</span> 镇馆之宝 / 核心馆藏 <span>❖</span>
                </h2>
                <div className="text-center text-sm text-gray-500 mb-6">
                    共收录 {m.treasures.length} 件珍贵藏品
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {m.treasures.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSearchFromMuseum(item.name)}
                            className="group relative bg-museum-800/40 border border-museum-700 p-5 rounded-lg text-left transition-all duration-300 hover:bg-museum-800 hover:border-museum-gold/60 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <div className="absolute top-3 left-3 text-xs font-mono text-museum-gold/50">
                                #{String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="flex justify-between items-start mt-4">
                                <div className="flex-1 pr-2">
                                    <h3 className="text-lg font-serif text-museum-100 group-hover:text-museum-gold transition-colors mb-2 leading-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 group-hover:text-gray-400 font-sans leading-relaxed">
                                        {item.reason}
                                    </p>
                                </div>
                                <ChevronRight className="text-museum-700 group-hover:text-museum-gold transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1" size={20} />
                            </div>
                        </button>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-600 mt-8">
                    点击任意文物名称进入深度解析模式
                </p>
            </section>
        </div>
    );
  }

  // -- ARTIFACT VIEW MODE --
  if (data.resultType === 'ARTIFACT' && data.artifact) {
      const art = data.artifact;
      // Prefer real search image if available AND valid (no error), fallback to AI generated heroImage
      const isRealImageAvailable = !!art.imageUrl && !imgError;
      const displayImage = isRealImageAvailable ? art.imageUrl : heroImage;
      const isRealImage = isRealImageAvailable; // For UI logic

      return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-fadeIn pb-20">

        {/* Back to Museum Button */}
        {sourceMuseum && (
          <div className="mb-6">
            <button
              onClick={onBackToMuseum}
              className="flex items-center gap-3 px-6 py-3 bg-museum-800/40 border border-museum-700 rounded-lg text-gray-300 hover:text-museum-gold hover:border-museum-gold/60 hover:bg-museum-800 transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 uppercase tracking-wide">返回镇馆之宝</span>
                <span className="font-serif text-sm">{sourceMuseum.name}</span>
              </div>
            </button>
          </div>
        )}

        {/* Header Section */}
        <header className="text-center space-y-4 border-b border-museum-700 pb-8">
            <h1 className="text-4xl md:text-6xl font-serif text-museum-gold tracking-wide">
            {art.standardName}
            </h1>
            {art.foreignName && (
            <h2 className="text-xl md:text-2xl font-light text-museum-100 opacity-80 italic font-serif">
                {art.foreignName}
            </h2>
            )}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm uppercase tracking-widest text-museum-100 opacity-60">
            <span className="flex items-center gap-2"><Landmark size={14}/> {art.civilization}</span>
            <span>|</span>
            <span className="flex items-center gap-2"><Calendar size={14}/> {art.era}</span>
            <span>|</span>
            <span className="flex items-center gap-2"><MapPin size={14}/> {art.locationOrCollection}</span>
            </div>
        </header>

        {/* Main Grid: Visual & Quick Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Image / Visual Placeholder */}
            <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-museum-700 bg-museum-900 shadow-2xl group">
            {displayImage ? (
                <>
                <img 
                    src={displayImage} 
                    alt={art.standardName} 
                    className={`w-full h-full ${isRealImage ? 'object-cover' : 'object-contain p-8'} transition-transform duration-700 group-hover:scale-105`}
                    onError={() => {
                        console.warn("Image failed to load:", displayImage);
                        if (isRealImageAvailable) {
                            setImgError(true);
                        }
                    }}
                />
                {isRealImage && art.imageSource && (
                    <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white/70 px-2 py-1 rounded backdrop-blur-sm">
                        Source: {art.imageSource}
                    </div>
                )}
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-museum-700 bg-museum-800">
                {isGeneratingImage ? (
                    <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 border-4 border-museum-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-museum-gold font-serif tracking-widest text-sm">RECONSTRUCTING ARTIFACT...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                    <Camera size={64} className="opacity-20 mb-4"/>
                    <span className="text-sm tracking-widest opacity-50">NO VISUALIZATION AVAILABLE</span>
                    </div>
                )}
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                <p className="text-xs text-center text-gray-400 font-mono">
                    {isRealImage ? 'ARCHIVAL PHOTOGRAPHY (WEB)' : 'AI GENERATED VISUALIZATION'}
                </p>
            </div>
            </div>

            {/* Right: Curator's Guide (The "Hook") */}
            <div className="flex flex-col justify-center space-y-8">
                <div className="relative p-8 border-l-2 border-museum-gold bg-museum-800/30">
                    <h3 className="text-museum-gold font-serif text-2xl mb-4 flex items-center gap-2">
                        <Info size={20}/> 策展人讲解
                    </h3>
                    <p className="text-lg leading-relaxed text-museum-50 font-light whitespace-pre-line text-justify">
                        {art.museumGuideText}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="bg-museum-800/50 p-4 rounded border border-museum-700">
                        <h4 className="text-museum-gold font-bold mb-2 flex items-center gap-2 uppercase tracking-wider">
                            <PenTool size={14} /> 材质与工艺
                        </h4>
                        <p className="text-gray-300">{art.material}</p>
                    </div>
                    <div className="bg-museum-800/50 p-4 rounded border border-museum-700">
                        <h4 className="text-museum-gold font-bold mb-2 flex items-center gap-2 uppercase tracking-wider">
                            <User size={14} /> 归属与使用者
                        </h4>
                        <p className="text-gray-300">{art.ownerOrUser}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Deep Analysis Section */}
        <section className="bg-museum-800/20 p-8 md:p-12 rounded-lg border border-museum-700">
            <h3 className="text-3xl font-serif text-museum-gold mb-8 text-center border-b border-museum-700 pb-4 inline-block w-full">
                深度解析
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-loose text-justify whitespace-pre-line">
                {art.deepAnalysis}
            </div>
        </section>

        {/* Viewing Tips */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 bg-museum-900 border border-museum-gold/30 p-8 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Eye size={120} />
                </div>
                <h3 className="text-2xl font-serif text-museum-gold mb-4 relative z-10">观展重点</h3>
                <p className="text-lg text-gray-300 leading-relaxed relative z-10">
                    {art.viewingTips}
                </p>
            </div>
            
            <div className="col-span-1 bg-gradient-to-br from-museum-800 to-museum-900 p-8 rounded-lg border border-museum-700 flex flex-col justify-center text-center">
                <span className="text-5xl mb-4 block">🏛️</span>
                <p className="text-sm uppercase tracking-widest text-museum-gold mb-2">Collection</p>
                <p className="text-xl font-serif">{art.locationOrCollection}</p>
            </div>
        </section>

        {/* 360 Visualization Prompts */}
        <section className="space-y-6 pt-8 border-t border-museum-700">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h3 className="text-xl font-serif text-white mb-2">数字化全景视图 (AI 生成)</h3>
                    <p className="text-sm text-gray-500 max-w-2xl">{art.technicalNote}</p>
                </div>
                <div className="text-xs text-museum-gold border border-museum-gold px-3 py-1 rounded-full bg-museum-gold/10">
                    INTERACTIVE GALLERY
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {art.imagePrompts.slice(0, 10).map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="relative aspect-square bg-black/40 border border-museum-700 rounded overflow-hidden group hover:border-museum-gold/50 transition-colors">
                            {item.imageUrl ? (
                            <>
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.angle} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                    onClick={() => window.open(item.imageUrl, '_blank')}
                                />
                                {/* Regenerate Button Overlay */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onGenerateAngle(index); }}
                                        className="p-2 bg-black/70 hover:bg-museum-gold text-white hover:text-black rounded-full transition-colors backdrop-blur-sm"
                                        title="Regenerate Image"
                                    >
                                        <RefreshCw size={14} className={item.isLoading ? "animate-spin" : ""} />
                                    </button>
                                </div>
                            </>
                            ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                {item.isLoading ? (
                                    <Loader2 className="animate-spin text-museum-gold mb-2" />
                                ) : (
                                    <button 
                                        onClick={() => onGenerateAngle(index)}
                                        className="group-hover:text-museum-gold text-gray-500 transition-colors flex flex-col items-center gap-2"
                                    >
                                        <ImagePlus size={24} />
                                        <span className="text-xs font-bold tracking-wider">GENERATE</span>
                                    </button>
                                )}
                            </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center pointer-events-none">
                                <span className="text-xs font-bold text-white uppercase tracking-wider block truncate">
                                    {item.angle}
                                </span>
                            </div>
                        </div>
                        {/* Prompt tooltip on hover or just small text */}
                        <p className="text-[10px] text-gray-600 truncate hidden group-hover:block">
                            {item.prompt}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        </div>
      );
  }

  return null;
};

export default AnalysisView;