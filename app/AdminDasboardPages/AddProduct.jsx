"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";

// Add Product Component
const AddProduct = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Add Product
              </h1>
              <p className="text-gray-500 mt-1">
                Add new products to your catalog
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6">
          <p className="text-gray-600">
            Add product form will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
