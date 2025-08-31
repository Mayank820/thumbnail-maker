import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignUp.jsx';
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

// Custom CSS for theme (can also be in index.css)
const globalStyles = `
  .gradient-text {
    background: linear-gradient(90deg, #38BDF8, #A78BFA, #F472B6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .glass-header {
    background-color: rgba(13, 17, 23, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(48, 54, 61, 0.5);
  }
`;

export default function App() {
  // Add global styles to the document head
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = globalStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* THIS IS HOW YOU USE IT */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
