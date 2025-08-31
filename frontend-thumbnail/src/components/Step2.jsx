// src/components/Step2.jsx
import React from "react";
import { CATEGORIES_DATA } from "../constants/form.jsx";

export default function Step2({ formData, handleCategorySelect, errors }) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        Step 2: What's Your Video's Category?
      </h2>
      <p className="text-slate-600 mb-6">
        This helps us understand the visual language of your niche.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategorySelect(cat.name)}
            className={`border-2 rounded-lg p-4 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-200
                            ${
                              formData.category === cat.name
                                ? "border-indigo-600 bg-indigo-50 scale-105"
                                : "border-slate-200 hover:border-indigo-400 hover:shadow-md"
                            }`}
          >
            {cat.icon}
            <span className="font-semibold text-slate-700">{cat.name}</span>
          </div>
        ))}
      </div>
      {errors.category && (
        <p className="text-red-500 text-sm mt-4">{errors.category}</p>
      )}
    </div>
  );
}
