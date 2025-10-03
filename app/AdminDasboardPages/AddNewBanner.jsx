import React, { useState } from "react";
import { Save, Upload } from "lucide-react";

const AddNewBanner = ({ onBack }) => {
  const [bannerData, setBannerData] = useState({
    title: "",
    priority: "",
    for: "Desktop",
    mainImage: null,
    imagePreview: null,
  });

  const handleInputChange = (field, value) => {
    setBannerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerData((prev) => ({
        ...prev,
        mainImage: file,
        imagePreview: imageUrl,
      }));
    }
  };

  const handleSubmit = () => {
    if (!bannerData.title || !bannerData.priority) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Banner data:", bannerData);
    // Handle form submission logic here
    alert("Banner added successfully!");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Banner Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bannerData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter banner title"
                    required
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={bannerData.priority}
                    onChange={(e) =>
                      handleInputChange("priority", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter priority number"
                    min="1"
                    required
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
                        checked={bannerData.for === "Desktop"}
                        onChange={(e) =>
                          handleInputChange("for", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Desktop
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="for"
                        value="Mobile"
                        checked={bannerData.for === "Mobile"}
                        onChange={(e) =>
                          handleInputChange("for", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Mobile</span>
                    </label>
                  </div>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="mainImage"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>
                          {bannerData.mainImage
                            ? bannerData.mainImage.name
                            : "Choose File"}
                        </span>
                      </div>
                    </label>
                  </div>
                  {!bannerData.mainImage && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select an image file
                    </p>
                  )}
                </div>

                {/* Add Banner Button */}
                <button
                  onClick={handleSubmit}
                  disabled={
                    !bannerData.title ||
                    !bannerData.priority ||
                    !bannerData.mainImage
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={20} />
                  <span>Add Banner</span>
                </button>

                {(!bannerData.title ||
                  !bannerData.priority ||
                  !bannerData.mainImage) && (
                  <p className="text-sm text-red-500 text-center">
                    Please fill in all required fields and select an image
                  </p>
                )}
              </div>

              {/* Right Column - Image Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Banner Preview
                </h3>

                {bannerData.imagePreview ? (
                  <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={bannerData.imagePreview}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Upload
                        size={48}
                        className="mx-auto mb-4 text-gray-400"
                      />
                      <p className="text-lg font-medium">Upload Image</p>
                      <p className="text-sm">Select an image to see preview</p>
                    </div>
                  </div>
                )}

                {bannerData.imagePreview && (
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Banner Details:
                    </h4>
                    <p className="text-xs text-gray-600">
                      Title: {bannerData.title || "Untitled"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Priority: {bannerData.priority || "Not set"}
                    </p>
                    <p className="text-xs text-gray-600">
                      For: {bannerData.for}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBanner;
