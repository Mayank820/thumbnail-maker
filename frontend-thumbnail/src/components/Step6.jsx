// src/components/Step6.jsx
import React from 'react';

export default function Step6({ formData }) {
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Ready to Go!</h2>
            <p className="text-slate-600 mb-6">Review your inputs below. If everything looks good, let's create!</p>
            <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
                <div className="flex items-center gap-4">
                    <strong className="text-slate-600 w-24">Photo:</strong>
                    <img src={formData.photoPreview} alt="Preview" className="h-12 w-auto rounded"/>
                    <span className="text-slate-800 text-sm">{formData.photoFile?.name}</span>
                </div>
                <div><strong className="text-slate-600 inline-block w-24">Category:</strong> <span className="text-slate-800">{formData.category}</span></div>
                <div><strong className="text-slate-600 inline-block w-24">Title/Topic:</strong> <span className="text-slate-800">{formData.title}</span></div>
                <div><strong className="text-slate-600 inline-block w-24">Moods:</strong> <span className="text-slate-800">{formData.moods.join(', ')}</span></div>
                <div>
                    <strong className="text-slate-600 inline-block w-24">Brand Color:</strong> 
                    <span className="inline-flex items-center gap-2">
                        <span style={{ backgroundColor: formData.brandColor }} className="w-5 h-5 rounded-full border border-slate-300"></span>
                        <span className="text-slate-800">{formData.brandColor}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}