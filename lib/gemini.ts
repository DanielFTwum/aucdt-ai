import { GoogleGenAI } from "@google/genai";
import { STUDENT_HANDBOOK_CONTEXT } from '../types';

export const streamResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[],
  image: string | null, // Base64 string or null
  onChunk: (text: string) => void
) => {
  try {
    // Safely retrieve API Key to prevent "process is not defined" runtime errors
    // We use typeof check to avoid ReferenceError if process is not declared in the global scope
    let apiKey = '';
    if (typeof process !== 'undefined' && process.env) {
      apiKey = process.env.API_KEY || '';
    }

    if (!apiKey) {
      onChunk("System Error: API configuration missing. Please contact support.");
      return "Error: API Key missing";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using 2.5 Flash-Lite for lightning-fast, real-time responses
    const model = 'gemini-2.5-flash-lite-preview-02-05';
    
    // Construct contents. If there's an image, it must be part of the user's message.
    const currentMessageParts: any[] = [{ text: prompt }];
    
    if (image) {
      // Extract base64 data (remove data:image/jpeg;base64, prefix if present for clean handling)
      // The SDK expects just the base64 string in 'data'. 
      
      let base64Data = image;
      let mimeType = 'image/jpeg';
      
      if (image.includes('base64,')) {
        const matches = image.match(/^data:(.*);base64,(.*)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      }

      currentMessageParts.unshift({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }

    // We prepend the system instruction via config
    const response = await ai.models.generateContentStream({
      model: model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })), 
        { role: 'user', parts: currentMessageParts }
      ],
      config: {
        systemInstruction: STUDENT_HANDBOOK_CONTEXT,
        temperature: 0.7, // Balanced creativity and precision
      }
    });

    let fullText = '';
    for await (const chunk of response) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    const errorMsg = "As the road twists (Nkyinkyim), so does technology sometimes falter. Please try again in a moment.";
    onChunk(errorMsg);
    return errorMsg;
  }
};