import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <p className="font-semibold text-sky-400">How It Works</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-4">From Idea to Viral Thumbnail in Seconds</h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">Our streamlined process makes professional design accessible to everyone.</p>
        </div>

        <div className="relative">
          {/* Decorative connecting line */}
          <div className="hidden md:block absolute top-10 left-10 w-px h-[calc(100%-5rem)] bg-white/10"></div>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="how-step relative flex items-start gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 ring-1 ring-white/10">
                <span className="text-3xl font-bold text-sky-400">01</span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Upload Your Assets</h3>
                <p className="text-gray-400 text-lg">Start by uploading your core images. This could be your photo, a logo, a product shot, or even an image for style inspiration. The more you provide, the better the AI can understand your vision.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="how-step relative flex items-start gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 ring-1 ring-white/10">
                <span className="text-3xl font-bold text-pink-400">02</span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Give Creative Direction</h3>
                <p className="text-gray-400 text-lg">Tell the AI what you want to create in your own words. Describe how you want to blend the images, the mood you're aiming for, and any text you want to include. Our AI Creative Director handles the rest.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="how-step relative flex items-start gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 ring-1 ring-white/10">
                <span className="text-3xl font-bold text-indigo-400">03</span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Generate & Download</h3>
                <p className="text-gray-400 text-lg">Our AI generates multiple stunning, high-CTR options based on your input. Pick your favorite, download it instantly, and get ready to watch your views climb.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

