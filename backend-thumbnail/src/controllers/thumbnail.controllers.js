import { rewritePromptWithOpenAI } from '../services/openai.services.js';
import { generateImagesWithGemini } from '../services/gemini.services.js';

/**
 * Handles the multi-image thumbnail generation process.
 */
export const handleThumbnailGeneration = async (req, res) => {
  console.log("Controller: Handling multi-image generation request...");
  try {
    // `req.files` is now an array of files from the upload middleware
    const files = req.files;
    const formData = {
      ...req.body,
      moods: JSON.parse(req.body.moods || '[]')
    };

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No photo files were uploaded.' });
    }

    // STAGE 1: Get the creative strategy from OpenAI based on user instructions
    const aiStrategy = await rewritePromptWithOpenAI(formData);

    // STAGE 2: Execute the strategy with Gemini, providing the strategy and all files
    const generatedImages = await generateImagesWithGemini(aiStrategy, files);

    if (!generatedImages || generatedImages.length === 0) {
      return res.status(500).json({ message: "AI failed to generate images. Please try again." });
    }

    // STAGE 3: Send the final blended images back to the frontend
    res.status(200).json({
      message: 'Thumbnails generated successfully!',
      images: generatedImages,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ message: error.message || "An internal server error occurred." });
  }
};

