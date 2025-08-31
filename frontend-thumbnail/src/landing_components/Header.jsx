import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom'; // Import Link

// The onNavigate prop is removed
export default function Header() {
  useGSAP(() => {
    gsap.from("#header", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  return (
    <header id="header" className="glass-header fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold gradient-text">Thumbnail AI</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300">How It Works</a>
            <a href="https://github.com/Mayank820/thumbnail-maker" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">GitHub</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-300">Login</button>
            {/* The button is now a Link component that navigates to your app */}
            <Link
              to="/app"
              className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

