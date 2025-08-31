import express from 'express';
import { handleThumbnailGeneration } from '../controllers/thumbnail.controllers.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// The main generation route.
// It uses the upload middleware first, then passes the request to the controller.
router.post('/generate', uploadMiddleware, handleThumbnailGeneration);

export default router;
