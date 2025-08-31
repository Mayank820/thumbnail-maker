import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// --- IMPORTS FOR NEW FEATURES ---
import connectDB from './src/config/db.js'; // Import the database connection function
import authRoutes from './src/routes/auth.routes.js'; // Import the new authentication routes

// --- EXISTING IMPORTS ---
import generateRoutes from './src/routes/generation.routes.js';

// --- INITIAL SETUP ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- CONNECT TO DATABASE ---
// This will be called as soon as the server starts.
connectDB();

// --- MIDDLEWARE ---
app.use(cors());
// This middleware is crucial for parsing JSON bodies from requests (like login/signup)
app.use(express.json());

// --- API ROUTES ---
// All routes starting with /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);

// All routes starting with /api/generate will be handled by generateRoutes
app.use('/api/generate', generateRoutes);

// Health check route to confirm the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running and connected' });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

