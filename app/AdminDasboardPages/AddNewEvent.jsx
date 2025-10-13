import React, { useState } from "react";
import { Save, Upload, ChevronDown, Plus } from "lucide-react";

const AddNewEvent = ({ onBack }) => {
  const [eventData, setEventData] = useState({
    title: "",
    venue: "",
    description: "",
    startTime: "",
    endTime: "",
    mainImage: null,
    eventImages: null,
    status: "Active",
    showVideoDetails: false,
    videos: [],
  });

  const handleInputChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, e) => {
    const file = field === "eventImages" ? e.target.files : e.target.files[0];
    setEventData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const toggleVideoDetails = () => {
    setEventData((prev) => ({
      ...prev,
      showVideoDetails: !prev.showVideoDetails,
    }));
  };

  const addVideo = () => {
    setEventData((prev) => ({
      ...prev,
      videos: [...prev.videos, { id: Date.now(), title: "", url: "" }],
    }));
  };

  const removeVideo = (videoId) => {
    setEventData((prev) => ({
      ...prev,
      videos: prev.videos.filter((video) => video.id !== videoId),
    }));
  };

  const updateVideo = (videoId, field, value) => {
    setEventData((prev) => ({
      ...prev,
      videos: prev.videos.map((video) =>
        video.id === videoId ? { ...video, [field]: value } : video
      ),
    }));
  };

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event title
                </label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter event title"
                />
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={eventData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter venue"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={eventData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter event description"
                />
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={eventData.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Start Time"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={eventData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="End Time"
                  />
                </div>
              </div>

              {/* Image Upload Fields */}
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
                  {!eventData.mainImage && (
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
                    />
                    <label
                      htmlFor="eventImages"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload size={20} />
                        <span>Choose Files</span>
                      </div>
                    </label>
                  </div>
                  {!eventData.eventImages && (
                    <p className="text-sm text-gray-500 mt-1">No file chosen</p>
                  )}
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
                      checked={eventData.status === "Active"}
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
                      checked={eventData.status === "Inactive"}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Video Details Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={toggleVideoDetails}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium"
                  >
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        eventData.showVideoDetails ? "rotate-180" : ""
                      }`}
                    />
                    <span>🛒 Video Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={addVideo}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    <Plus size={16} />
                    <span>Add Video</span>
                  </button>
                </div>

                {eventData.showVideoDetails && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-4">Video Info</p>

                    {eventData.videos.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        No videos added yet. Click "Add Video" to get started.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {eventData.videos.map((video) => (
                          <div
                            key={video?.id}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">
                                Video {eventData.videos.indexOf(video) + 1}
                              </h4>
                              <button
                                onClick={() => removeVideo(video?.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Video Title
                                </label>
                                <input
                                  type="text"
                                  value={video?.title}
                                  onChange={(e) =>
                                    updateVideo(
                                      video?.id,
                                      "title",
                                      e?.target?.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                  placeholder="Enter video title"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Video URL
                                </label>
                                <input
                                  type="url"
                                  value={video.url}
                                  onChange={(e) =>
                                    updateVideo(
                                      video?.id,
                                      "url",
                                      e?.target?.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                  placeholder="Enter video URL"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Add Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;
