import { GoogleGenAI } from "@google/genai";

import { extractGeminiResponse } from "../utils/extractGeminiResponse.js";

const GEMINI_MODEL = "gemini-2.0-flash";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const geminiChatServices = async ({ contents }) => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      temperature: 0.2,
      top_k: 5,
    });

    return extractGeminiResponse({ response });
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
