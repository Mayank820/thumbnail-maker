import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import generateRoutes from './src/routes/generation.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// --- CORS Configuration for Production ---
const whitelist = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS check for origin:', origin);

    if (!origin) return callback(null, true);
    
    // Check if the incoming origin is in our whitelist
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error('Origin not allowed by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

