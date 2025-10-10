import React, { useState } from "react";
import { Save, Upload, Loader2 } from "lucide-react";

const AddNewBanner = ({ onBack }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [bannerData, setBannerData] = useState({
    title: "",
    priority: "",
    for: "desktop",
    mainImage: null,
    imagePreview: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setBannerData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear any previous errors or success messages
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError("Please select a valid image file");
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setUploadError("Image size should be less than 5MB");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setBannerData((prev) => ({
        ...prev,
        mainImage: file,
        imagePreview: imageUrl,
      }));
      setUploadError(null);
    }
  };

  console.log( bannerData.mainImage," bannerData.mainImage")

  const handleSubmit = async () => {
    // Validation
    if (!bannerData.title || !bannerData.priority || !bannerData.mainImage) {
      setUploadError("Please fill in all required fields");
      return;
    }
  
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
  
    try {
      // Get token from localStorage
      const token = localStorage.getItem('access_token');
      
      // Create FormData object
      const formData = new FormData();
      formData.append('banner_title', bannerData.title);
      formData.append('priority', parseInt(bannerData.priority)); // Convert to integer
      formData.append('device_type', bannerData.for);
      formData.append('image', bannerData.mainImage);

      // Proper way to log FormData contents
      console.log("=== FormData being sent ===", formData);
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, "File:", value.name, "Type:", value.type, "Size:", value.size);
        } else {
          console.log(key, value);
        }
      }
      console.log("API Endpoint:", `${baseUrl}/admin/home-banner`);
      console.log("========================");
  
      // Make API call
      const response = await fetch(`${baseUrl}/admin/home-banner`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        // Log detailed error information
        console.error("API Error Details:", data);
        const errorMessage = data.message || data.error || JSON.stringify(data);
        throw new Error(errorMessage || `Upload failed with status ${response.status}`);
      }
  
      // Success
      setUploadSuccess(true);
      alert("Banner added successfully!");
      
      // Reset form after successful upload
      setBannerData({
        title: "",
        priority: "",
        for: "desktop",
        mainImage: null,
        imagePreview: null,
      });
  
      // Clear file input
      const fileInput = document.getElementById('mainImage');
      if (fileInput) {
        fileInput.value = '';
      }
  
      // Optional: Navigate back or refresh data
      // if (onBack) {
      //   setTimeout(() => onBack(), 1500);
      // }
  
    } catch (error) {
      console.error("Error uploading banner:", error);
      setUploadError(error.message || "Failed to upload banner. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {uploadSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Banner uploaded successfully!
              </p>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                ✕ {uploadError}
              </p>
            </div>
          )}

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
                    disabled={isUploading}
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
                    disabled={isUploading}
                  />
                </div>

                {/* For (desktop/mobile) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    For
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="for"
                        value="desktop"
                        checked={bannerData.for === "desktop"}
                        onChange={(e) =>
                          handleInputChange("for", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        disabled={isUploading}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Desktop
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="for"
                        value="mobile"
                        checked={bannerData.for === "mobile"}
                        onChange={(e) =>
                          handleInputChange("for", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        disabled={isUploading}
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
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="mainImage"
                      className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
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
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (Max 5MB)
                    </p>
                  )}
                </div>

                {/* Add Banner Button */}
                <button
                  onClick={handleSubmit}
                  disabled={
                    !bannerData.title ||
                    !bannerData.priority ||
                    !bannerData.mainImage ||
                    isUploading
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Add Banner</span>
                    </>
                  )}
                </button>

                {(!bannerData.title ||
                  !bannerData.priority ||
                  !bannerData.mainImage) && !isUploading && (
                  <p className="text-sm text-gray-500 text-center">
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