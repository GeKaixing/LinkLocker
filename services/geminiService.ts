import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysis } from "../types";
import { Language } from "../i18n/translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    isSafe: { type: Type.BOOLEAN },
  },
  required: ["title", "description", "isSafe"],
};

export const analyzeUrl = async (url: string, language: Language = 'en'): Promise<GeminiAnalysis> => {
  try {
    const langPrompt = language === 'zh' ? 'Respond in Simplified Chinese.' : 'Respond in English.';
    
    const prompt = `
      I need you to generate a creative and engaging preview for a link.
      The URL is: "${url}".
      
      Please infer what this website or resource might be based on the URL structure and common knowledge.
      1. Provide a short, catchy Title (max 40 chars).
      2. Provide a 1-sentence Description (max 120 chars) that makes someone want to click or unlock it.
      3. Determine if this looks like a safe/legitimate URL structure (boolean).

      ${langPrompt}
      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback if AI fails
    const isZh = language === 'zh';
    return {
      title: isZh ? "加密内容" : "Locked Content",
      description: isZh ? "此链接包含用户加密锁定的内容。" : "This link contains content securely locked by the user.",
      isSafe: true,
    };
  }
};

export const analyzeImage = async (base64Data: string, mimeType: string, language: Language = 'en'): Promise<GeminiAnalysis> => {
  try {
    const langPrompt = language === 'zh' ? 'Respond in Simplified Chinese.' : 'Respond in English.';
    
    const prompt = `
      Analyze this image.
      1. Provide a creative, short Title (max 40 chars) describing the image content.
      2. Provide a 1-sentence Description (max 120 chars) that makes someone want to see it.
      3. Is this image safe for work (no nudity/violence)? Set isSafe boolean.

      ${langPrompt}
      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiAnalysis;

  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    const isZh = language === 'zh';
    return {
      title: isZh ? "加密图片" : "Secret Image",
      description: isZh ? "此图片已被锁定。" : "This image has been locked by the sender.",
      isSafe: true,
    };
  }
};

export const analyzeAudio = async (base64Data: string, mimeType: string, language: Language = 'en'): Promise<GeminiAnalysis> => {
  try {
    const langPrompt = language === 'zh' ? 'Respond in Simplified Chinese.' : 'Respond in English.';
    
    const prompt = `
      Analyze this audio clip.
      1. Provide a creative, short Title (max 40 chars) describing the sound or speech.
      2. Provide a 1-sentence Description (max 120 chars).
      3. Is this audio safe (no hate speech/violence)? Set isSafe boolean.

      ${langPrompt}
      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiAnalysis;

  } catch (error) {
    console.error("Gemini Audio Analysis Error:", error);
    const isZh = language === 'zh';
    return {
      title: isZh ? "加密音频" : "Secret Audio",
      description: isZh ? "此音频已被锁定。" : "This audio has been locked by the sender.",
      isSafe: true,
    };
  }
};

export const analyzeText = async (content: string, language: Language = 'en'): Promise<GeminiAnalysis> => {
  try {
    const langPrompt = language === 'zh' ? 'Respond in Simplified Chinese.' : 'Respond in English.';
    
    const prompt = `
      Analyze this text content.
      Content snippet: "${content.substring(0, 1000)}..."
      
      1. Provide a creative, short Title (max 40 chars) summarizing the text.
      2. Provide a 1-sentence Description (max 120 chars).
      3. Is this text safe? Set isSafe boolean.

      ${langPrompt}
      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiAnalysis;

  } catch (error) {
    console.error("Gemini Text Analysis Error:", error);
    const isZh = language === 'zh';
    return {
      title: isZh ? "加密文章" : "Secret Article",
      description: isZh ? "此文章已被锁定。" : "This article has been locked by the sender.",
      isSafe: true,
    };
  }
};