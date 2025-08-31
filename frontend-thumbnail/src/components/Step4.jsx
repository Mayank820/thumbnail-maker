// src/components/Step4.jsx
import React from 'react';
import { MOODS_DATA } from '../constants/form.jsx';

export default function Step4({ formData, handleMoodToggle, errors }) {
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Step 4: What's the Vibe?</h2>
            <p className="text-slate-600 mb-6">Select up to 3 moods. This sets the creative direction.</p>
            <div className="flex flex-wrap gap-3">
                {MOODS_DATA.map(mood => (
                    <button
                        key={mood}
                        onClick={() => handleMoodToggle(mood)}
                        className={`border rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200
                            ${formData.moods.includes(mood) 
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                            }
                            ${formData.moods.length >= 3 && !formData.moods.includes(mood) ? 'opacity-50 cursor-not-allowed' : ''}`
                        }
                    >
                        {mood}
                    </button>
                ))}
            </div>
            {errors.moods && <p className="text-red-500 text-sm mt-4">{errors.moods}</p>}
        </div>
    );
}