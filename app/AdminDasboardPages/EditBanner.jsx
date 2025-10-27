import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import axios from "axios";

const EditBanner = ({ onBack, bannerId, bannerData }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    for: "desktop",
    mainImage: null,
    currentImageUrl: null,
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem("access_token");
  };

  const getAxiosConfig = () => {
    const token = getAuthToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    if (bannerId) {
      fetchBannerDetails(bannerId);
    }
  }, [bannerId]);

  const fetchBannerDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const config = getAxiosConfig();
      const response = await axios.get(`${baseUrl}/home-banner/${id}`, config);

      if (response.data.success) {
        const banner = response.data.data;
        setFormData({
          title: banner.banner_title || "",
          priority: banner.priority || "",
          for: banner.device_type === "desktop" ? "desktop" : "mobile",
          mainImage: null,
          currentImageUrl: banner.image_url || null,
          status: "Active",
        });
      }
    } catch (err) {
      setError("Failed to load banner details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
        currentImageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdateBanner = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      const formDataToSend = new FormData();
      formDataToSend.append("banner_title", formData.title);
      formDataToSend.append("priority", parseInt(formData.priority));
      formDataToSend.append("device_type", formData.for.toLowerCase());
      if (formData.mainImage) {
        formDataToSend.append("image", formData.mainImage);
      }

      const response = await axios.put(
        `${baseUrl}/admin/home-banner/${bannerId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Banner updated successfully!");
        onBack();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update banner. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddNewBanner = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     if (!formData.mainImage) {
  //       alert("Please select an image");
  //       setLoading(false);
  //       return;
  //     }

  //     const token = getAuthToken();

  //     const formDataToSend = new FormData();
  //     formDataToSend.append("banner_title", formData.title);
  //     formDataToSend.append("priority", parseInt(formData.priority));
  //     formDataToSend.append("device_type", formData.for.toLowerCase());
  //     formDataToSend.append("image", formData.mainImage);

  //     const response = await axios.post(
  //       `${baseUrl}/admin/home-banner`,
  //       formDataToSend,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       alert("Banner added successfully!");
  //       onBack(); // Go back to list
  //     }
  //   } catch (err) {
  //     const errorMessage =
  //       err.response?.data?.message ||
  //       "Failed to add banner. Please try again.";
  //     setError(errorMessage);
  //     alert(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {bannerId ? "Loading banner..." : "Processing..."}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-red-800 text-center">{error}</p>
            </div>
          )}

          {/* Content Card */}
          {!loading && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      // placeholder="Enter priority number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={formData.priority}
                      onChange={(e) =>
                        handleInputChange("priority", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter priority number"
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
                          checked={formData.for === "desktop"}
                          onChange={(e) =>
                            handleInputChange("for", e.target.value)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          desktop
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="for"
                          value="mobile"
                          checked={formData.for === "mobile"}
                          onChange={(e) =>
                            handleInputChange("for", e.target.value)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          mobile
                        </span>
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
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Active
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={formData.status === "Inactive"}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Inactive
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    {bannerId && (
                      <button
                        onClick={handleUpdateBanner}
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                      >
                        {loading ? "Updating..." : "Update Banner"}
                      </button>
                    )}
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
                            <Upload
                              size={48}
                              className="mx-auto mb-4 text-gray-400"
                            />
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

                    {formData.mainImage ? (
                      <p className="text-sm text-green-600 mt-2">
                        New file selected: {formData.mainImage.name}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">
                        No new file chosen
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
