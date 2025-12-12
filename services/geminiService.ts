import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeArtifact = async (query: string): Promise<AnalysisResult> => {
  const systemPrompt = `
    你是一个【数字博物馆知识中枢 AI】，支持“单件文物解析模式”和“博物馆镇馆之宝查询模式”。
    
    【核心判断逻辑】：
    1. 判断用户输入（"${query}"）是【博物馆/美术馆/机构名称】还是【具体文物名称】。
    2. 判断该文物或博物馆是否位于中国，或属于中国历史文化范畴。
    
    【核心要求 - 真实图像】：
    - 必须使用 Google Search 查找该文物或博物馆的**真实照片 URL**。
    - **中国文物/博物馆优先级**（当文物或博物馆位于中国时）：
      1. 故宫博物院官网 (dpm.org.cn) 的高清图片
      2. 中国国家博物馆官网 (chnmuseum.cn) 的图片
      3. 各地博物馆官网的公开图片（如上海博物馆、陕西历史博物馆等）
      4. 百度百科、维基百科中文版的图片资源
      5. Wikimedia Commons 中关于中国文物的图片
      **搜索建议**：对于中国文物，优先使用"文物名称 + 高清图片 + 博物馆官网"等中文关键词搜索
    - **其他国家文物优先级**：
      1. Wikimedia Commons (.jpg/.png) 的直接链接（支持外链且稳定）
      2. 博物馆官网的公开图片
      3. 权威艺术/历史网站的图片
    - **禁止**：不要使用看似像图片但实际是 HTML 页面的链接。不要使用 Base64。
    - 链接必须以 \`https://\` 开头。
    - 如果找不到确定的直接图片链接，\`imageUrl\` 字段请留空字符串 ""，前端会自动生成 AI 示意图。
    
    【JSON 数据结构定义】：
    请严格遵循以下 JSON 结构返回数据 (不要使用 Markdown 代码块):
    
    {
      "resultType": "ARTIFACT" | "MUSEUM", 
      
      // resultType="MUSEUM" 时:
      "museum": {
        "name": "博物馆官方名称",
        "location": "城市, 国家",
        "intro": "简要介绍 (50-80字)",
        "imageUrl": "https://upload.wikimedia.org/...",
        "imageSource": "Wikimedia Commons / [Source Name]",
        "treasures": [
          { "name": "文物名称1", "reason": "入选理由 (20-30字)" },
          { "name": "文物名称2", "reason": "..." },
          // ... 至少10个镇馆之宝
        ]
      },

      【镇馆之宝要求】：
      - 当 resultType="MUSEUM" 时，必须返回至少 10 个镇馆之宝/核心馆藏
      - 每个文物的 reason 应简明扼要（20-30字），说明其历史、文化或艺术价值
      - 优先选择该博物馆最具代表性、知名度最高的藏品
      
      // resultType="ARTIFACT" 时:
      "artifact": { 
        "standardName": "标准名称",
        "foreignName": "外文名",
        "civilization": "文明",
        "era": "年代",
        "type": "类型",
        "material": "材质",
        "ownerOrUser": "使用者",
        "locationOrCollection": "收藏地",
        "museumGuideText": "官方讲解词(约200字)",
        "deepAnalysis": "深度解析",
        "viewingTips": "观展提示",
        "imageUrl": "https://upload.wikimedia.org/...",
        "imageSource": "Wikimedia Commons / [Source Name]",
        "imagePrompts": [
          { "angle": "Front", "prompt": "photorealistic..." },
          { "angle": "Left 45", "prompt": "..." }
        ],
        "technicalNote": "说明"
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `请解析：${query}`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemPrompt,
      },
    });

    let text = response.text;
    if (!text) throw new Error("No data returned");

    // Robust JSON Extraction
    text = text.replace(/```json/g, "").replace(/```/g, "");
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        text = text.substring(startIndex, endIndex + 1);
    } else {
        // Fallback: sometimes search results interfere, try to parse what we have or throw
        console.error("Raw response:", response.text);
        throw new Error("Invalid response format");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error(error instanceof Error ? error.message : "Analysis failed");
  }
};

export const generateHeroImage = async (prompt: string): Promise<string | null> => {
  try {
    const enhancedPrompt = `
      Authentic museum photography, 8k resolution, highly detailed, photorealistic, macro lens,
      ${prompt},
      sharp focus, professional archival lighting, no watermark, no text, texture-rich, masterpiece.
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};