import OpenAI from 'openai';
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Acts as a Creative Director for multi-image blending.
 * @param {object} formData - The user's form data, including the 'instructions' field.
 * @returns {Promise<{rewrittenPrompt: string, suggestedText: string, textDesign: string}>} A structured creative brief.
 */
export const rewritePromptWithOpenAI = async (formData) => {
  console.log("Service: Strategizing multi-image concept with OpenAI...");

  const { instructions, category, title, moods } = formData;
  const moodString = moods.join(', ');

  const systemPrompt = `
    You are an expert AI Creative Director. Your job is to interpret a user's creative instructions and their multiple uploaded images to create a master prompt for a generative AI. The goal is to blend these elements into a single, cohesive new image.

    Analyze the user's input:
    - User's Core Instruction: "${instructions}"
    - Video Category: "${category}"
    - Video Title/Topic: "${title}"
    - Desired Moods: "${moodString}"

    Based on this, perform THREE tasks:
    1.  **Visual Prompt:** Synthesize the user's instructions and the implied content of their multiple images into a single, detailed paragraph. Describe the final, blended scene. This is the main instruction for the image AI. Be specific about how the elements from the different images should be combined.
    2.  **Thumbnail Text:** Create a very short, powerful, "clickbaity" text overlay (3-6 words) that captures the essence of the user's blended idea.
    3.  **Text Design:** Describe a simple, high-contrast graphic design for the text (e.g., "White text on a solid black rectangle.").

    Provide your response STRICTLY in the following JSON format:
    {
      "rewrittenPrompt": "A detailed paragraph describing the final, blended visual scene.",
      "suggestedText": "A short, catchy phrase for the thumbnail.",
      "textDesign": "A simple description of the text's graphic design."
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      response_format: { type: "json_object" },
    });
    const aiResult = JSON.parse(response.choices[0].message.content);
    console.log("Service: OpenAI multi-image strategy complete:", aiResult);
    return aiResult;
  } catch (error) {
    console.error("Error in OpenAI service:", error);
    throw new Error("Failed to generate thumbnail strategy with OpenAI.");
  }
};

