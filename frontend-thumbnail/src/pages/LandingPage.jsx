import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '../landing_components/Header';
import Hero from '../landing_components/Hero';
import Features from '../landing_components/Features';
import HowItWorks from '../landing_components/HowItWorks';
import Footer from '../landing_components/Footer';

// The onNavigate prop is removed from the function definition
export default function LandingPage() {
  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // 2. Register GSAP ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 3. Scroll-Triggered Animations for sections
    const animateUp = (element, trigger) => {
        gsap.from(element, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: trigger || element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    };

    document.querySelectorAll('.feature-card').forEach(card => animateUp(card));
    document.querySelectorAll('.how-step').forEach(step => animateUp(step));
    animateUp("#features h2");
    animateUp("#how-it-works h2");

    // Cleanup on component unmount
    return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <div className="bg-[#0D1117] text-[#E6EDF3]">
      {/* The onNavigate prop is removed from Header and Hero */}
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

