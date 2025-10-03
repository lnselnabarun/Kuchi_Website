import React, { useState } from "react";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import EditBanner from "./EditBanner";

const AllBannerList = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list"); // "list" or "edit"
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [banners] = useState([
    {
      id: 1,
      title: "L_image 3",
      priority: "1",
      for: "Desktop",
      status: "Active",
      image: "/api/placeholder/150/100",
    },
    {
      id: 2,
      title: "desktop",
      priority: "2",
      for: "Desktop",
      status: "Active",
      image: "/api/placeholder/150/100",
    },
    {
      id: 3,
      title: "desktop",
      priority: "3",
      for: "Desktop",
      status: "Active",
      image: "/api/placeholder/150/100",
    },
    {
      id: 4,
      title: "desktop",
      priority: "4",
      for: "Desktop",
      status: "Inactive",
      image: "/api/placeholder/150/100",
    },
    {
      id: 5,
      title: "desktop",
      priority: "5",
      for: "Desktop",
      status: "Active",
      image: "/api/placeholder/150/100",
    },
    {
      id: 6,
      title: "desktop",
      priority: "6",
      for: "Desktop",
      status: "Active",
      image: "/api/placeholder/150/100",
    },
  ]);

  const handleEdit = (id) => {
    const bannerToEdit = banners.find((banner) => banner.id === id);
    setSelectedBanner(bannerToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedBanner(null);
  };

  const handleDelete = (id) => {
    console.log("Delete banner:", id);
    // Add delete logic here
  };

  const handleView = (id) => {
    console.log("View banner:", id);
    // Add view logic here
  };

  const handleAddNew = () => {
    console.log("Add new banner");
    // You can handle this by calling a prop function or navigating
    // For now, just logging
  };

  // If we're in edit mode, show the EditBanner component
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
          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-3">Banner</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-6 text-center">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {banners.map((banner, index) => (
                <div
                  key={banner?.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Serial Number */}
                    <div className="col-span-1 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {banner?.id}
                      </span>
                    </div>

                    {/* Banner Info */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                          <img
                            src={banner?.image}
                            alt={banner?.title}
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
                            {banner?.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            Banner #{banner?.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          banner?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {banner?.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleView(banner?.id)}
                          className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                          title="View Banner"
                        >
                          <Eye size={16} />
                        </button>
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
              ))}
            </div>
          </div>

          {/* Add Banner Button (Floating Action Button) */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            title="Add New Banner"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBannerList;
