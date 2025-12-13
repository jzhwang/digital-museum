import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";
import { findPresetImage } from "./imageDatabase";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 处理可能有防盗链的图片 URL
 * 百度百科等中国网站的图片通常有 Referer 检查
 */
function processImageUrl(url: string): string {
  if (!url) return url;

  // 百度百科图片代理（使用第三方图片代理服务）
  if (url.includes('baidu.com') || url.includes('bcebos.com')) {
    // 使用 images.weserv.nl 作为图片代理
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  }

  return url;
}

export const analyzeArtifact = async (query: string): Promise<AnalysisResult> => {
  // 🎯 优先检查预设数据库
  const presetImage = findPresetImage(query);
  if (presetImage) {
    console.log(`✅ 在预设数据库中找到图片：${presetImage.name}`);
  }

  const systemPrompt = `你是数字博物馆AI，返回纯JSON（无markdown）。

判断 "${query}" 是博物馆还是文物：

博物馆格式：
{
  "resultType": "MUSEUM",
  "museum": {
    "name": "名称",
    "location": "城市, 国家",
    "intro": "50-80字介绍",
    "imageUrl": "",
    "imageSource": "",
    "treasures": [{"name": "文物名", "reason": "20字理由"}] // 至少10个
  }
}

文物格式：
{
  "resultType": "ARTIFACT",
  "artifact": {
    "standardName": "名称",
    "foreignName": "外文名",
    "civilization": "文明",
    "era": "年代",
    "type": "类型",
    "material": "材质",
    "ownerOrUser": "使用者",
    "locationOrCollection": "收藏地",
    "museumGuideText": "150字讲解",
    "deepAnalysis": "200字分析",
    "viewingTips": "80字提示",
    "imageUrl": "",
    "imageSource": "",
    "imagePrompts": [
      {"angle": "正面", "prompt": "高质量博物馆摄影，${query}，正面视角，黑色背景，专业灯光"},
      {"angle": "侧面", "prompt": "高质量博物馆摄影，${query}，侧面视角，黑色背景，专业灯光"},
      {"angle": "细节", "prompt": "高质量博物馆摄影，${query}，细节特写，黑色背景，专业灯光"}
    ],
    "technicalNote": "3D视图生成说明"
  }
}

要求：imageUrl和imageSource留空，imagePrompts只需3个角度`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `请解析：${query}`,
      config: {
        // ⚡ 移除 Google Search 工具以加速响应（我们已有预设图片数据库）
        // tools: [{ googleSearch: {} }],
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

    const result = JSON.parse(text) as AnalysisResult;

    // 🎯 优先使用预设数据库图片
    if (result.artifact) {
      if (presetImage) {
        // 如果预设数据库有图片，直接使用（无论 API 返回什么）
        result.artifact.imageUrl = presetImage.imageUrl;
        result.artifact.imageSource = presetImage.source;
        console.log(`🎨 使用预设图片：${presetImage.name} → ${presetImage.imageUrl}`);
      } else if (!result.artifact.imageUrl || result.artifact.imageUrl === "") {
        // 预设数据库没有，且 API 也没返回图片，保持为空（前端会生成 AI 图）
        console.log(`⚠️ 未找到预设图片，也无 API 图片：${result.artifact.standardName}`);
      } else {
        // 预设数据库没有，但 API 返回了图片，应用代理处理
        result.artifact.imageUrl = processImageUrl(result.artifact.imageUrl);
        console.log(`🌐 使用 API 图片：${result.artifact.imageUrl}`);
      }
    }

    // 处理博物馆图片
    if (result.museum?.imageUrl) {
      result.museum.imageUrl = processImageUrl(result.museum.imageUrl);
    }

    return result;

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