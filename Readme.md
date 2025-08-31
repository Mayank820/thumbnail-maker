Thumbnail AI 🚀
Stop Guessing. Start Creating Thumbnails that Get Clicks.

Thumbnail AI is a full-stack web application designed to empower content creators by leveraging the power of generative AI to produce stunning, high-click-through-rate (CTR) YouTube thumbnails in seconds. This tool moves beyond simple templates, acting as a creative partner that can fuse multiple images, interpret creative directions, and generate complete, professional designs with high-impact text.

✨ Key Features
Creative Image Fusion: Blend multiple images—a user's photo, a product, a logo, or style references—into a single, cohesive, and original masterpiece.

AI Creative Director: Users provide simple instructions, and our AI pipeline, powered by OpenAI's GPT-4o, acts as a creative director, writing detailed prompts and design briefs.

High-Impact Text Overlays: The AI not only generates the visual scene but also suggests short, "clickbaity" text and a graphic design for the overlay (e.g., "White text on a solid red rectangle").

Dual Aspect Ratios: Generates both horizontal (16:9) thumbnails for standard videos and vertical (9:16) thumbnails for Shorts, Reels, and TikToks.

Secure User Authentication: A complete authentication system (signup/login) built with Node.js, MongoDB, and JWTs to manage user accounts.

Elegant & Animated UI: A beautiful, dark-themed landing page built with React, featuring animations powered by GSAP and smooth scrolling from Lenis.

Modular Codebase: Both the frontend (React) and backend (Node.js/Express) are built with a clean, modular, and scalable architecture.

🛠️ Tech Stack
Frontend
Framework: React (Vite)

Routing: React Router DOM

Styling: Tailwind CSS

Animations: GSAP (GreenSock Animation Platform) & Lenis

State Management: React Context API (for Auth)

Data Fetching: TanStack Query (React Query) & Axios

UI Components: lucide-react for icons

Backend
Framework: Node.js with Express

Database: MongoDB with Mongoose

Authentication: JSON Web Tokens (JWT) & bcryptjs for password hashing

File Handling: multer for multi-image uploads

AI Services:

OpenAI API (GPT-4o): For creative direction, prompt rewriting, and text generation.

Google Gemini API (Gemini 2.5 Flash Image): For advanced image generation and composition.

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18.x or later recommended)

pnpm (as the package manager)

A MongoDB Atlas account (for the database)

An OpenAI API Key

A Google AI Studio API Key (for the Gemini API)

🚀 Getting Started
Follow these steps to get the project up and running on your local machine.

1. Clone the Repository
git clone [https://github.com/your-username/thumbnail-ai.git](https://github.com/your-username/thumbnail-ai.git)
cd thumbnail-ai

2. Backend Setup
# Navigate to the backend directory
cd backend-thumbnail

# Install dependencies
pnpm install

# Create a .env file in the root of the backend directory
# and add your credentials
cp .env.example .env 

Your backend-thumbnail/.env file should look like this:

MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_super_long_and_secret_jwt_string"
OPENAI_API_KEY="sk-..."
GEMINI_API_KEY="AIza..."
PORT=3001

3. Frontend Setup
# Navigate to the frontend directory from the root
cd frontend-thumbnail

# Install dependencies
pnpm install

The frontend does not require an .env file as all API calls are proxied through the backend.

4. Running the Application
You will need two separate terminal windows to run both the backend and frontend servers simultaneously.

In the first terminal (from the backend-thumbnail directory):

# Start the backend server
pnpm run dev

The backend will be running at http://localhost:3001.

In the second terminal (from the frontend-thumbnail directory):

# Start the frontend development server
pnpm run dev

The frontend will be running at http://localhost:5173. Open this URL in your browser to see the landing page.

📄 API Endpoints
POST /api/auth/signup: Register a new user.

POST /api/auth/login: Log in an existing user.

POST /api/generate: The main protected endpoint for generating thumbnails. Expects multipart/form-data with images and user instructions.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.