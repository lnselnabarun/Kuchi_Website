"use client";
import React from "react";
import { FileText, Shield, Info, ArrowLeft } from "lucide-react";

const ContentManagement = ({ onBack, onNavigate }) => {
  const contentOptions = [
    {
      id: "about-us",
      label: "About Us",
      icon: Info,
      description: "Manage your company's about us content",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "terms-conditions",
      label: "Terms & Conditions",
      icon: FileText,
      description: "Edit terms and conditions content",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      icon: Shield,
      description: "Update privacy policy content",
      color: "from-green-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className=" p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600 mt-1">Manage website content and policies</p>
            </div>
            {/* <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button> */}
          </div>
        </div>

        {/* Content Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => onNavigate(option.id)}
                className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${option.color} p-4 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  <span>Edit Content</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;