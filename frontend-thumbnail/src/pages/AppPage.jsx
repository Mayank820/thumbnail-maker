import React, { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import { GenerateIcon } from '../components/Icons.jsx';
import Step1 from '../components/Step1.jsx';
import Step2 from '../components/Step2.jsx';
import Step3 from '../components/Step3.jsx';
import Step4 from '../components/Step4.jsx';
import Step5 from '../components/Step5.jsx';
import Step6 from '../components/Step6.jsx';
import StepGenerating from '../components/StepGenerating.jsx';
import ThumbnailGrid from '../components/ThumbnailGrid.jsx';

// Renamed from App to AppPage
export default function AppPage() {
  // --- STATE MANAGEMENT (UPDATED FOR MULTIPLE FILES) ---
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    photoFiles: [], // Changed from photoFile: null
    photoPreviews: [], // Changed from photoPreview: null
    category: "",
    title: "",
    instructions: "", // New field for user's creative direction
    moods: [],
    brandColor: "#4f46e5",
  });
  const [errors, setErrors] = useState({});
  const [generatedImages, setGeneratedImages] = useState(null);
  
  const TOTAL_STEPS = 6;

  // --- EVENT HANDLERS (UPDATED FOR MULTIPLE FILES) ---
  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setFormData(prev => ({
        ...prev,
        photoFiles: [...prev.photoFiles, ...newFiles],
        photoPreviews: [...prev.photoPreviews, ...newPreviews]
      }));
      setErrors(prev => ({ ...prev, photo: null }));
    }
  };
  
  const handleRemoveFile = (indexToRemove) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(formData.photoPreviews[indexToRemove]);

    setFormData(prev => ({
      ...prev,
      photoFiles: prev.photoFiles.filter((_, index) => index !== indexToRemove),
      photoPreviews: prev.photoPreviews.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category }));
    setErrors((prev) => ({ ...prev, category: null }));
  };

  const handleMoodToggle = (mood) => {
    setFormData((prev) => {
      const newMoods = prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood];
      if (newMoods.length > 3) return prev;
      return { ...prev, moods: newMoods };
    });
    setErrors((prev) => ({ ...prev, moods: null }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const { mutate: generateThumbnails, isPending } = useMutation({
    mutationFn: async (formData) => {
      const apiFormData = new FormData();
      formData.photoFiles.forEach(file => {
        apiFormData.append('photos', file);
      });
      apiFormData.append('category', formData.category);
      apiFormData.append('title', formData.title);
      apiFormData.append('instructions', formData.instructions);
      apiFormData.append('moods', JSON.stringify(formData.moods));
      apiFormData.append('brandColor', formData.brandColor);
      const { data } = await axios.post('http://localhost:3001/api/generate', apiFormData);
      return data;
    },
    onSuccess: (data) => {
      toast.success('Thumbnails generated successfully!');
      setGeneratedImages(data.images);
    },
    onError: (error) => {
      console.error("API Call Error:", error);
      toast.error(error.response?.data?.message || 'An error occurred during generation.');
    },
  });

  const validateStep = () => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (formData.photoFiles.length === 0) newErrors.photo = 'Please upload at least one image.';
        break;
      case 3:
        if (!formData.instructions.trim()) newErrors.instructions = 'Please provide some instructions.';
        break;
      case 2:
        if (!formData.category) newErrors.category = "Please select a category to continue.";
        break;
      case 4:
        if (formData.moods.length === 0) newErrors.moods = "Please select at least one mood.";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleGenerate = () => {
    if (validateStep()) {
      generateThumbnails(formData);
    }
  };

  const handleReset = () => {
    formData.photoPreviews.forEach(url => URL.revokeObjectURL(url));
    setGeneratedImages(null);
    setCurrentStep(1);
    setFormData({
      photoFiles: [], photoPreviews: [], category: "", title: "",
      instructions: "", moods: [], brandColor: "#4f46e5",
    });
    setErrors({});
  };
  
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = useMemo(() => {
    if (isPending || generatedImages) return 100;
    return ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  }, [currentStep, isPending, generatedImages]);


  return (
    <div className="bg-slate-100 flex items-center justify-center min-h-screen p-4 font-sans">
       <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300">
        {!generatedImages && (
          <header>
            <h1 className="text-3xl font-bold text-slate-800 text-center">Create Your Perfect Thumbnail</h1>
            <p className="text-center text-slate-500 mt-2">Upload your assets and tell the AI what to create.</p>
            <div className="mt-6">
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.4s ease' }}></div>
              </div>
            </div>
          </header>
        )}

        <main className="min-h-[350px] flex flex-col justify-center">
          {isPending ? (
            <StepGenerating />
          ) : generatedImages ? (
            <ThumbnailGrid images={generatedImages} onReset={handleReset} queryData={formData} />
          ) : (
            <>
              {currentStep === 1 && <Step1 {...{ formData, handleFileChange, handleRemoveFile, errors }} />}
              {currentStep === 2 && <Step2 {...{ formData, handleCategorySelect, errors }} />}
              {currentStep === 3 && <Step3 {...{ formData, handleInputChange, errors }} />}
              {currentStep === 4 && <Step4 {...{ formData, handleMoodToggle, errors }} />}
              {currentStep === 5 && <Step5 {...{ formData, handleInputChange }} />}
              {currentStep === 6 && <Step6 {...{ formData }} />}
            </>
          )}
        </main>
        
        {!isPending && !generatedImages && (
          <footer className="flex justify-between items-center pt-6 border-t border-slate-200">
            <button onClick={prevStep} disabled={currentStep === 1} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-md font-semibold hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
            {currentStep === TOTAL_STEPS ? (
              <button onClick={handleGenerate} className="px-8 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"><GenerateIcon /> Generate</button>
            ) : (
              <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors">Next</button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

