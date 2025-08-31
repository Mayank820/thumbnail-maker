import React from 'react';

export default function Step3({ formData, handleInputChange, errors }) {
    return (
        <div className="animate-fadeIn space-y-6">
             <div>
                <label htmlFor="video-title" className="block text-sm font-medium text-slate-700">Video Title (Optional)</label>
                <input 
                    type="text" 
                    id="video-title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., 'My Honest Review of the New Pixel 10'" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-slate-700">
                   Creative Instructions <span className="text-red-500">*</span>
                </label>
                <textarea 
                    id="instructions" 
                    name="instructions" 
                    rows="4"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="e.g., 'Combine my photo with the art style of the second image. Make the background a futuristic city.'" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
                 {errors.instructions && <p className="text-red-500 text-sm mt-2">{errors.instructions}</p>}
            </div>
        </div>
    );
}
