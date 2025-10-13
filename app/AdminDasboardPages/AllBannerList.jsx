import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import EditBanner from "./EditBanner";
import axios from "axios";

const AllBannerList = ({ onBack }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [currentView, setCurrentView] = useState("list"); // "list" or "edit"
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch banners from API
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseUrl}/home-banner`);
      if (response.data.success) {
        setBanners(response.data.data);
      }
    } catch (err) {
      setError("Failed to load banners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const bannerToEdit = banners.find((banner) => banner.id === id);
    setSelectedBanner(bannerToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedBanner(null);
    // Refresh the list when coming back
    fetchBanners();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
      } catch (err) {
        alert("Failed to delete banner");
      }
    }
  };

  const handleView = (id) => {};

  const handleAddNew = () => {};

  if (currentView === "edit") {
    return (
      <EditBanner
        onBack={handleBackToList}
        bannerId={selectedBanner?.id}
        bannerData={selectedBanner}
      />
    );
  }

  // Default list view
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading banners...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-red-800 text-center">{error}</p>
              <button
                onClick={fetchBanners}
                className="mt-2 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Content Card */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">Banner</div>
                  <div className="col-span-2">Device Type</div>
                  <div className="col-span-6 text-center">Action</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {banners.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-500">
                    No banners found. Click the + button to add a new banner.
                  </div>
                ) : (
                  banners.map((banner, index) => (
                    <div
                      key={banner?.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Serial Number */}
                        <div className="col-span-1 text-center">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </div>

                        {/* Banner Info */}
                        <div className="col-span-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                              <img
                                src={banner?.image_url}
                                alt={banner?.banner_title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `data:image/svg+xml;base64,${btoa(`
                                    <svg width="150" height="100" xmlns="http://www.w3.org/2000/svg">
                                      <rect width="150" height="100" fill="#f3f4f6"/>
                                      <text x="75" y="55" text-anchor="middle" fill="#6b7280" font-size="12">Banner ${banner?.id}</text>
                                    </svg>
                                  `)}`;
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {banner?.banner_title}
                              </p>
                              <p className="text-xs text-gray-500">
                                Priority: {banner?.priority}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Device Type */}
                        <div className="col-span-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {banner?.device_type}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-6">
                          <div className="flex items-center justify-center space-x-2">
                            {/* <button
                              onClick={() => handleView(banner?.id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                              title="View Banner"
                            >
                              <Eye size={16} />
                            </button> */}
                            <button
                              onClick={() => handleEdit(banner?.id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                              title="Edit Banner"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(banner?.id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                              title="Delete Banner"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBannerList;
