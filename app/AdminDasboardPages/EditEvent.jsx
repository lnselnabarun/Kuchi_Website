import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import axios from "axios";

const EditEvent = ({ onBack, eventId }) => {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    description: "",
    startTime: "",
    endTime: "",
    eventLocation: "",
    mainImage: null,
    eventImages: [],
    status: "Active",
    showVideoDetails: false,
    videos: [],
  });

  const [imagePreview, setImagePreview] = useState({
    mainImage: null,
    eventImages: [],
  });

  const [existingImages, setExistingImages] = useState({
    mainImageUrl: null,
    eventImageUrls: [],
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch event data on component mount
  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  // Format datetime for input fields (YYYY-MM-DDTHH:MM)
  const formatDateTimeForInput = (dateTimeString) => {
    if (!dateTimeString) return "";
    // Remove the Z and milliseconds, then take first 16 characters
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Fetch event details from API
  const fetchEventDetails = async () => {
    setFetchingData(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://192.168.0.182:8000/api/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(response?.data?.data?.event_images_urls[0],"responseresponse")

      if (response.data.success && response.data.data) {
        const eventData = response.data.data;

        // Set form data
        setFormData({
          title: eventData.title || "",
          venue: eventData.venue || "",
          description: eventData.description || "",
          startTime: formatDateTimeForInput(eventData.start_time),
          endTime: formatDateTimeForInput(eventData.end_time),
          eventLocation: eventData.event_location || "",
          mainImage: null,
          eventImages: [],
          status: eventData.status || "Active",
          showVideoDetails: eventData.show_video_details || false,
          videos: eventData.videos || [],
        });

        // Set existing images
        setExistingImages({
          mainImageUrl: eventData.main_image_url || null,
          eventImageUrls: eventData.event_images_urls || [],
        });
      }
    } catch (err) {
      setError("Failed to fetch event details. Please try again.");
    } finally {
      setFetchingData(false);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData?.title.trim()) {
      errors.title = "Event title is required";
    }
    if (!formData?.venue.trim()) {
      errors.venue = "Venue is required";
    }
    if (!formData?.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData?.startTime) {
      errors.startTime = "Start time is required";
    }
    if (!formData?.endTime) {
      errors.endTime = "End time is required";
    }
    if (formData?.startTime && formData?.endTime) {
      if (new Date(formData?.startTime) >= new Date(formData?.endTime)) {
        errors.endTime = "End time must be after start time";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle file changes
  const handleFileChange = (field, e) => {
    if (field === "mainImage") {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          mainImage: file,
        }));
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prev) => ({
            ...prev,
            mainImage: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if (field === "eventImages") {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        eventImages: files,
      }));
      // Create previews
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagePreview((prev) => ({
              ...prev,
              eventImages: previews,
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove image
  // const removeImage = (type) => {
  //   if (type === "mainImage") {
  //     setFormData((prev) => ({ ...prev, mainImage: null }));
  //     setImagePreview((prev) => ({ ...prev, mainImage: null }));
  //     // Clear the file input
  //     const input = document.getElementById("mainImage");
  //     if (input) input.value = "";
  //   }
  // };

  // Format datetime for API
  const formatDateTime = (dateTimeLocal) => {
    if (!dateTimeLocal) return "";
    if (dateTimeLocal.length === 16) {
      return dateTimeLocal + ":00";
    }
    return dateTimeLocal;
  };

  // Handle update event
  const handleUpdateEvent = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("start_time", formatDateTime(formData?.startTime));
      formDataToSend.append("venue", formData?.venue);
      formDataToSend.append("end_time", formatDateTime(formData?.endTime));
      formDataToSend.append("status", formData?.status);
      if (formData?.mainImage) {
        formDataToSend.append("main_image", formData?.mainImage);
      }
      formDataToSend.append("title", formData?.title);
      formDataToSend.append("videos", JSON.stringify(formData?.videos));
      formDataToSend.append("event_location", formData?.eventLocation || "");
      formDataToSend.append(
        "show_video_details",
        formData?.showVideoDetails.toString()
      );
      formDataToSend.append("description", formData?.description);
      if (formData?.eventImages && formData?.eventImages.length > 0) {
        formData?.eventImages.forEach((image) => {
          formDataToSend.append("event_images[]", image);
        });
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://192.168.0.182:8000/api/events/${eventId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setError("");
        // Refresh the data
        await fetchEventDetails().then(() => {
          onBack();
        });
        // Show success message for 2 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(response.data.message || "Failed to update event");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join(", ");
        setError(errorMessages);
      } else {
        setError("Failed to update event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching data
  if (fetchingData) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Event List</span>
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Event List</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Event updated successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter event title"
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.title}
                  </p>
                )}
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData?.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.venue
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter venue"
                />
                {validationErrors.venue && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.venue}
                  </p>
                )}
              </div>

              {/* Event Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Location
                </label>
                <input
                  type="text"
                  value={formData?.eventLocation}
                  onChange={(e) =>
                    handleInputChange("eventLocation", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter specific location (e.g., Hall 3, Gate A)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    validationErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter event description"
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData?.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      validationErrors.startTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.startTime && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.startTime}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData?.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      validationErrors.endTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.endTime && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.endTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Upload Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image
                  </label>

                  {/* Show existing image if no new image is selected */}
                  {existingImages.mainImageUrl && !imagePreview.mainImage && (
                    <div className="mb-3">
                      <img
                        src={existingImages.mainImageUrl}
                        alt="Current main image"
                        className="w-full h-40 object-contain rounded-lg border border-gray-200"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Current image
                      </p>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*"
                      onChange={(e) => handleFileChange("mainImage", e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="mainImage"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>
                          {formData?.mainImage ? "Change File" : "Choose File"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Images
                  </label>

                  {existingImages.eventImageUrls.length > 0 &&
                    imagePreview.eventImages.length === 0 && (
                      <div className="mb-3">
                        <div className="grid grid-cols-3 gap-2">
                          {existingImages.eventImageUrls.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Event image ${index + 1}`}
                              className="w-full h-20 object-contain rounded border border-gray-200"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Current images
                        </p>
                      </div>
                    )}

                  {imagePreview.eventImages.length > 0 && (
                    <div className="mb-3">
                      <div className="grid grid-cols-3 gap-2">
                        {imagePreview.eventImages.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`New event image ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-gray-200"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        New images ({imagePreview.eventImages.length})
                      </p>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      id="eventImages"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange("eventImages", e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="eventImages"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>
                          {formData?.eventImages.length > 0
                            ? "Change Files"
                            : "Choose Files"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

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
                      checked={formData?.status === "Active"}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData?.status === "Inactive"}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleUpdateEvent}
                  disabled={loading}
                  className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Updating Event...
                    </>
                  ) : (
                    "Update Event"
                  )}
                </button>
                <button
                  onClick={onBack}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
