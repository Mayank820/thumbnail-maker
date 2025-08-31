import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import generateRoutes from './src/routes/generation.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

const whitelist = [
  'http://localhost:5173', // For local development
  process.env.FRONTEND_URL, // The Vercel URL you will get after deployment
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); // Use the specific options
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});