import multer from 'multer';

// Configure Multer for file uploads in memory
const storage = multer.memoryStorage();

// Create the Multer instance, now accepting an array of files.
// 'photos' is the field name. 5 is the maximum number of files allowed.
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per file
});

export const uploadMiddleware = upload.array('photos', 5);
