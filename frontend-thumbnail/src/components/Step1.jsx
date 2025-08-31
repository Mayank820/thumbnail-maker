import React from 'react';
import { UploadIcon } from './Icons';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Step1({ formData, handleFileChange, handleRemoveFile, errors }) {
    const onDragOver = (e) => e.preventDefault();
    const onDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            handleFileChange(e.dataTransfer.files);
        }
    };

    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Step 1: Upload Your Creative Assets</h2>
            <p className="text-slate-600 mb-4">You can upload multiple images (e.g., your photo, a logo, a product, a background idea).</p>

            {/* --- Image Preview Grid --- */}
            {formData.photoPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                    {formData.photoPreviews.map((previewUrl, index) => (
                        <div key={index} className="relative group aspect-square">
                            <img src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md border border-slate-200" />
                            <button
                                onClick={() => handleRemoveFile(index)}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 group-hover:opacity-100 opacity-0 transition-opacity"
                                aria-label="Remove image"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* --- Upload Area --- */}
            <label htmlFor="photo-upload"
                className="mt-4 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors block"
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <input
                    type="file"
                    id="photo-upload"
                    className="hidden"
                    accept="image/*"
                    multiple // Allow multiple file selection
                    onChange={(e) => handleFileChange(e.target.files)}
                />
                <UploadIcon />
                <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-500">You can select multiple files at once</p>
            </label>
            {errors.photo && <p className="text-red-500 text-sm mt-2">{errors.photo}</p>}
        </div>
    );
};
