import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-image-preview",
});

/**
 * Generates a new image by blending multiple input images based on a creative strategy.
 * @param {object} aiStrategy - The structured object from OpenAI { rewrittenPrompt, suggestedText, textDesign }.
 * @param {Array<object>} files - The array of user's uploaded files from multer.
 * @returns {Promise<Array<{id: number, url: string}>>} An array of generated images.
 */
export const generateImagesWithGemini = async (aiStrategy, files) => {
  console.log(
    `Service: Generating blended image from ${files.length} assets...`
  );

  const { rewrittenPrompt, suggestedText, textDesign } = aiStrategy;

  // --- DYNAMICALLY BUILD THE PROMPT WITH MULTIPLE IMAGES ---
  // 1. Start with the master text prompt from OpenAI.
  const promptParts = [
    `Create a single, complete, photorealistic YouTube thumbnail (16:9).
    - **Core Task:** Your main goal is to creatively blend and combine all the provided images based on this detailed creative direction: "${rewrittenPrompt}".
    - **Text Overlay:** Add the exact text: "${suggestedText}".
    - **Text Style:** The text must be styled exactly as described here: "${textDesign}".
    - **Final Output:** The result must be a single, cohesive, high-quality image that looks like a professional design, not a simple collage.`,
  ];

  // 2. Add each uploaded image as a separate part in the prompt array.
  for (const file of files) {
    promptParts.push({
      inlineData: {
        data: file.buffer.toString("base64"),
        mimeType: file.mimetype,
      },
    });
  }

  // Since this is a complex blending task, we will generate two variations.
  const generationPromises = [
    geminiModel.generateContent(promptParts),
    geminiModel.generateContent(promptParts), // Ask for a second creative take
  ];

  try {
    const generationResults = await Promise.all(generationPromises);
    const generatedImages = [];

    generationResults.forEach((result, index) => {
      const imagePart = result?.response?.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData
      );
      if (imagePart) {
        const base64Data = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType;
        const imageUrl = `data:${mimeType};base64,${base64Data}`;
        generatedImages.push({ id: index + 1, url: imageUrl });
      }
    });

    console.log(
      `Service: Successfully generated ${generatedImages.length} blended images.`
    );
    return generatedImages;
  } catch (error) {
    console.error(
      "Error in Gemini multi-image service:",
      JSON.stringify(error, null, 2)
    );
    throw new Error("Failed to generate blended image with Gemini.");
  }
};
