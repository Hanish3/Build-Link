

import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Initialize ai as null
let ai: GoogleGenAI | null = null;

// Only create an instance if the API key is provided
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

/**
 * Checks if the AI service is available and configured.
 */
export const isAiAvailable = (): boolean => !!ai;

const AI_UNAVAILABLE_ERROR_MESSAGE = "AI service is not configured. Please ensure the API_KEY is set correctly in your environment variables.";

/**
 * Sends a text message to a specified Gemini model.
 */
export const sendMessage = async (prompt: string, modelName: string): Promise<string> => {
  if (!ai) {
    return AI_UNAVAILABLE_ERROR_MESSAGE;
  }
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error with ${modelName}:`, error);
    return `Error processing your request with ${modelName}. Please check the console for details.`;
  }
};

/**
 * Edits an image using a text prompt with Gemini 2.5 Flash Image.
 */
export const editImageWithAI = async (prompt: string, image: { data: string, mimeType: string }): Promise<string> => {
  if (!ai) {
    throw new Error(AI_UNAVAILABLE_ERROR_MESSAGE);
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: image.data,
              mimeType: image.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};


/**
 * Generates an image from a text prompt using Imagen.
 */
export const generateImageWithAI = async (prompt: string): Promise<string | null> => {
  if (!ai) {
    throw new Error(AI_UNAVAILABLE_ERROR_MESSAGE);
  }
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};