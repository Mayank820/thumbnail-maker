// src/components/StepGenerating.jsx
import React from 'react';
import { Spinner } from './Icons';

export default function StepGenerating() {
    return (
        <div className="animate-fadeIn text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Thinking & Creating...</h2>
            <p className="text-slate-600 mb-6 max-w-md">Our AI is analyzing your inputs and crafting the perfect visual assets. This might take a moment.</p>
            <Spinner />
            <p className="text-sm text-slate-500 mt-4">Rewriting prompt... generating backgrounds...</p>
        </div>
    );
}