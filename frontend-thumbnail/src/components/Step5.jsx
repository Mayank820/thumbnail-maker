// src/components/Step5.jsx
import React from 'react';

export default function Step5({ formData, handleInputChange }) {
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Step 5: Add Your Branding (Optional)</h2>
            <p className="text-slate-600 mb-6">Incorporate your brand colors for a consistent look.</p>
            <div className="flex items-center space-x-4">
                <label htmlFor="brand-color" className="block text-sm font-medium text-slate-700">Primary Brand Color:</label>
                <input 
                    type="color" 
                    id="brand-color" 
                    name="brandColor"
                    value={formData.brandColor}
                    onChange={handleInputChange} 
                    className="h-10 w-10 p-0 border-none rounded-md cursor-pointer"
                />
                <input 
                    type="text"
                    name="brandColor"
                    value={formData.brandColor}
                    onChange={handleInputChange}
                    className="w-28 px-2 py-1 border border-slate-300 rounded-md"
                />
            </div>
        </div>
    );
}