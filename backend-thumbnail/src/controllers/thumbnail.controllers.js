import { rewritePromptWithOpenAI } from '../services/openai.services.js';
import { generateImagesWithGemini } from '../services/gemini.services.js';

export const handleThumbnailGeneration = async (req, res) => {
  console.log("Controller: Handling multi-image generation request...");
  try {
    const files = req.files;
    const formData = {
      ...req.body,
      moods: JSON.parse(req.body.moods || '[]')
    };

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No photo files were uploaded.' });
    }

    const aiStrategy = await rewritePromptWithOpenAI(formData);

    const generatedImages = await generateImagesWithGemini(aiStrategy, files);

    if (!generatedImages || generatedImages.length === 0) {
      return res.status(500).json({ message: "AI failed to generate images. Please try again." });
    }

    res.status(200).json({
      message: 'Thumbnails generated successfully!',
      images: generatedImages,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ message: error.message || "An internal server error occurred." });
  }
};

