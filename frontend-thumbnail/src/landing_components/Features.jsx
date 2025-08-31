import React from 'react';
// Import the new icons from lucide-react
import { Combine, Wand2, Type } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Everything You Need to Go Viral</h2>
          <p className="mt-4 text-lg text-gray-400">Our AI does the heavy lifting, so you can focus on making great content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1: Creative Image Fusion */}
          <div className="feature-card bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
            <div className="text-indigo-400 mb-4">
              {/* Replaced SVG with Lucide Icon */}
              <Combine size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-2">Creative Image Fusion</h3>
            <p className="text-gray-400">Blend multiple images—your photo, a product, a reference—into a single, cohesive, and original masterpiece.</p>
          </div>
          
          {/* Feature Card 2: AI Creative Director */}
          <div className="feature-card bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
            <div className="text-indigo-400 mb-4">
              {/* Replaced SVG with Lucide Icon */}
              <Wand2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Creative Director</h3>
            <p className="text-gray-400">Just give simple instructions. Our AI acts as your creative director, writing detailed prompts to generate the perfect scene.</p>
          </div>

          {/* Feature Card 3: High-Impact Text */}
          <div className="feature-card bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
            <div className="text-indigo-400 mb-4">
              {/* Replaced SVG with Lucide Icon */}
              <Type size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-2">High-Impact Text</h3>
            <p className="text-gray-400">Get AI-generated text overlays and designs that are engineered to be bold, legible, and incredibly click-worthy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

