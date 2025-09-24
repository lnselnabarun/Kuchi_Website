import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";

const EditBanner = ({ onBack, bannerId, bannerData }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    for: "Desktop",
    mainImage: null,
    currentImageUrl: null,
    status: "Active"
  });

  // Initialize form with existing banner data
  useEffect(() => {
    if (bannerData) {
      setFormData({
        title: bannerData.title || "",
        priority: bannerData.priority || "",
        for: bannerData.for || "Desktop",
        mainImage: null,
        currentImageUrl: bannerData.image || null,
        status: bannerData.status || "Active"
      });
    }
  }, [bannerData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        mainImage: file,
        currentImageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleUpdateBanner = () => {
    console.log("Updating banner:", bannerId, formData);
    // Handle update banner logic here
    // After successful update, you can redirect back to list
    // onBack();
  };

  const handleAddNewBanner = () => {
    console.log("Adding new banner with data:", formData);
    // Handle add new banner logic here
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* Main Content */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Banner List</span>
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter priority number"
                  />
                </div>

                {/* For (Desktop/Mobile) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    For
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="for"
                        value="Desktop"
                        checked={formData.for === "Desktop"}
                        onChange={(e) => handleInputChange("for", e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Desktop</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="for"
                        value="Mobile"
                        checked={formData.for === "Mobile"}
                        onChange={(e) => handleInputChange("for", e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Mobile</span>
                    </label>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Status
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === "Inactive"}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Inactive</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleUpdateBanner}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Update Banner
                  </button>
                  <button
                    onClick={handleAddNewBanner}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Add New Banner
                  </button>
                </div>
              </div>

              {/* Right Column - Image Section */}
              <div className="space-y-6">
                {/* Main Image Label */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Main Image
                  </label>
                  
                  {/* Current Image Display */}
                  <div className="mb-4">
                    {formData.currentImageUrl ? (
                      <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                        <img
                          src={formData.currentImageUrl}
                          alt="Current banner"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="400" height="256" xmlns="http://www.w3.org/2000/svg">
                                <rect width="400" height="256" fill="#f3f4f6"/>
                                <text x="200" y="135" text-anchor="middle" fill="#6b7280" font-size="16">Banner Image</text>
                              </svg>
                            `)}`;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                          <p>No image available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="relative">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="mainImage"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>Choose File</span>
                      </div>
                    </label>
                  </div>
                  
                  {!formData.mainImage && (
                    <p className="text-sm text-gray-500 mt-2">No file chosen</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;