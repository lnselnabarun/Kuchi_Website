"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";

// Add Product Component
const CropProductImage = ({ onBack }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-8">
          {/* Crop Image Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm">📷</span>
              </div>
              <h2 className="text-lg font-semibold">Crop Image</h2>
            </div>

            {/* Width Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image Thumb Width in Pixel (Height will be auto calculated)
              </label>
              <input
                type="number"
                defaultValue="600"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white/50"
                placeholder="Enter width in pixels"
              />
            </div>

            {/* Crop Button and Info */}
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Crop Image
              </button>
              <p className="text-sm text-gray-600">
                The images which is already cropped in the same resolution will not be cropped again
              </p>
            </div>

          </div>
        </div>
  );
};

export default CropProductImage;
