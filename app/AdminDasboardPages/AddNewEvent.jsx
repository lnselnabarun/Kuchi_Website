import React, { useState } from "react";
import {
  Save,
  Upload,
  ChevronDown,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";

const AddNewEvent = ({ onBack }) => {
  const [eventData, setEventData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    mainImage: null,
    eventImages: [],
  });

  const handleInputChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleFileChange = (field, e) => {
    if (field === "eventImages") {
      const files = Array.from(e.target.files);
      setEventData((prev) => ({
        ...prev,
        [field]: files,
      }));

      // Create preview URLs for multiple images
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => ({
        ...prev,
        eventImages: previews,
      }));
    } else {
      const file = e.target.files[0];
      setEventData((prev) => ({
        ...prev,
        [field]: file,
      }));

      // Create preview URL for main image
      if (file) {
        const preview = URL.createObjectURL(file);
        setImagePreview((prev) => ({
          ...prev,
          mainImage: preview,
        }));
      }
    }
  };

  const validateForm = () => {
    if (!eventData.title.trim()) {
      setError("Event title is required");
      return false;
    }
    if (!eventData.venue.trim()) {
      setError("Venue is required");
      return false;
    }
    if (!eventData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!eventData.startTime) {
      setError("Start time is required");
      return false;
    }
    if (!eventData.endTime) {
      setError("End time is required");
      return false;
    }
    if (new Date(eventData.startTime) >= new Date(eventData.endTime)) {
      setError("End time must be after start time");
      return false;
    }
    if (!eventData.eventLocation.trim()) {
      setError("Event location is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formatDateTime = (dateTimeLocal) => {
        if (!dateTimeLocal) return "";
        if (dateTimeLocal.length === 16) {
          return dateTimeLocal + ":00";
        }
        return dateTimeLocal;
      };
      const formData = new FormData();
      formData.append("start_time", formatDateTime(eventData.startTime));
      formData.append("venue", eventData.venue);
      formData.append("end_time", formatDateTime(eventData.endTime));
      formData.append("status", "Active");
      if (eventData.mainImage) {
        formData.append("main_image", eventData.mainImage);
      }
      formData.append("title", eventData.title);
      formData.append("videos", "[]");
      formData.append("event_location", eventData.eventLocation);
      formData.append("show_video_details", "true");
      formData.append("description", eventData.description);
      if (eventData.eventImages && eventData.eventImages.length > 0) {
        eventData.eventImages.forEach((image) => {
          formData.append("event_images[]", image);
        });
      }
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
        } else {
        }
      }
      const token = localStorage.getItem("access_token");
      if (!token) {
      }

      const response = await fetch("http://192.168.0.182:8000/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setError("");
        setTimeout(() => {
          setEventData({
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
          setImagePreview({
            mainImage: null,
            eventImages: [],
          });
          setSuccess(false);
          if (onBack) {
            onBack();
          }
        }, 2000);
      } else {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Event created successfully!</span>
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter event title"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter venue"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventData.eventLocation}
                  onChange={(e) =>
                    handleInputChange("eventLocation", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter event location (e.g., City, Country)"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={eventData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter event description"
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={eventData.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Start Time"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={eventData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="End Time"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*"
                      onChange={(e) => handleFileChange("mainImage", e)}
                      className="hidden"
                      disabled={loading}
                    />
                    <label
                      htmlFor="mainImage"
                      className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>Choose File</span>
                      </div>
                    </label>
                  </div>
                  {eventData.mainImage ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">
                        {eventData.mainImage.name}
                      </p>
                      {imagePreview.mainImage && (
                        <img
                          src={imagePreview.mainImage}
                          alt="Main preview"
                          className="h-20 w-20 object-cover rounded"
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No file chosen</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Images
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="eventImages"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange("eventImages", e)}
                      className="hidden"
                      disabled={loading}
                    />
                    <label
                      htmlFor="eventImages"
                      className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>Choose Files</span>
                      </div>
                    </label>
                  </div>
                  {eventData.eventImages && eventData.eventImages.length > 0 ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">
                        {eventData.eventImages.length} file(s) selected
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {imagePreview.eventImages.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Event ${index + 1}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      No files chosen
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Add Event</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;
