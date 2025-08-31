import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold gradient-text">Thumbnail AI</h3>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Stop spending hours on design. Let's create something amazing together.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
          <a href="https://github.com/Mayank820/thumbnail-maker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          <a href="https://drive.google.com/drive/folders/13SMMq7RQe-F3PkyRfwgSKeJZIyg4bcej?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Sample Images</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
        </div>
        <p className="text-gray-500 mt-8 text-sm">&copy; 2025 Thumbnail AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
