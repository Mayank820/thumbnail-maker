import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom'; // Import Link

// The onNavigate prop is removed
export default function Hero() {
  const visualGridRef = useRef(null);

  useGSAP(() => {
    // Animate hero text entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl.from('.hero-title', { opacity: 0, y: 50, duration: 1 })
          .from('.hero-subtitle', { opacity: 0, y: 40, duration: 0.8 }, "-=0.6")
          .from('.hero-cta', { opacity: 0, y: 30, duration: 0.6 }, "-=0.5");

    // Create and animate the background grid
    const placeholders = [
        'https://images.pexels.com/photos/30449359/pexels-photo-30449359.jpeg',
        'https://images.pexels.com/photos/33600936/pexels-photo-33600936.jpeg',
        'https://images.pexels.com/photos/31903567/pexels-photo-31903567.jpeg',
        'https://placehold.co/400x225/f59e0b/0D1117?text=Gaming',
        'https://placehold.co/400x225/10b981/0D1117?text=Tech+Review',
        'https://placehold.co/400x225/6366f1/0D1117?text=Lifestyle'
    ];
    
    // Ensure the ref is current before appending children
    if (visualGridRef.current) {
        for (let i = 0; i < 30; i++) {
            const img = document.createElement('img');
            img.src = placeholders[i % placeholders.length];
            img.className = 'absolute rounded-lg';
            img.style.width = `${gsap.utils.random(100, 200)}px`;
            img.style.top = `${gsap.utils.random(0, 100)}%`;
            img.style.left = `${gsap.utils.random(0, 100)}%`;
            visualGridRef.current.appendChild(img);

            gsap.to(img, {
                y: gsap.utils.random(-100, 100),
                x: gsap.utils.random(-100, 100),
                rotation: gsap.utils.random(-30, 30),
                duration: gsap.utils.random(20, 40),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
  }, { scope: visualGridRef });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-700/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,90,213,0.2),transparent_40%)]"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Stop Guessing. <br /> <span className="gradient-text">Start Creating Thumbnails that Get Clicks.</span>
        </h1>
        <p className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10">
          Fuse your ideas, photos, and creative prompts into stunning, high-CTR YouTube thumbnails in seconds.
        </p>
        <div className="hero-cta flex justify-center space-x-4">
          {/* The button is now a Link component that navigates to your app */}
          <Link
            to="/app"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
      <div ref={visualGridRef} className="hero-visuals-grid absolute inset-0 w-full h-full opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
    </section>
  );
}

