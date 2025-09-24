"use client";
import React, { useState } from "react";
import {
  Package,
  ArrowLeft,
  Save,
  Globe,
  Clock,
  Share2,
  Settings,
} from "lucide-react";

const AccountSettings = ({ onBack }) => {
  const [formData, setFormData] = useState({
    siteUrl: "https://kuchi.in/",
    frontendSorting: "Random",
    parcelGrouping: "2",
    sliderSpeed: "4",
    facebookLink: "http://www.facebook.com/kuchi.in",
    instagramLink: "http://www.instagram.com/kuchijewelry",
    twitterLink: "",
    pinterestLink: "",
    youtubeLink: "https://www.youtube.com/results?search_query=kuchi+jewelry",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleButtonClick = (buttonId, callback) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(""), 200);
    if (callback) callback();
  };

  const handleUpdateItem = async () => {
    handleButtonClick("save", () => {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Settings updated:", formData);
        setIsLoading(false);
      }, 1500);
    });
  };

  const socialMediaFields = [
    {
      key: "facebookLink",
      label: "Facebook URL",
      icon: Globe,
      placeholder: "https://facebook.com/yourpage",
      color: "from-blue-600 to-blue-700"
    },
    {
      key: "instagramLink", 
      label: "Instagram URL",
      icon: Globe,
      placeholder: "https://instagram.com/youraccount",
      color: "from-pink-600 to-purple-700"
    },
    {
      key: "twitterLink",
      label: "Twitter URL", 
      icon: Globe,
      placeholder: "https://twitter.com/youraccount",
      color: "from-sky-500 to-blue-600"
    },
    {
      key: "pinterestLink",
      label: "Pinterest URL",
      icon: Share2,
      placeholder: "https://pinterest.com/youraccount",
      color: "from-red-600 to-red-700"
    },
    {
      key: "youtubeLink",
      label: "YouTube URL",
      icon: Globe, 
      placeholder: "https://youtube.com/yourchannel",
      color: "from-red-600 to-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            {onBack && (
              <button
                onClick={() => handleButtonClick("back", onBack)}
                className={`p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 rounded-xl transition-all duration-300 transform ${
                  clickedButton === "back" ? "scale-90 bg-slate-100" : "hover:scale-110"
                }`}
              >
                <ArrowLeft size={22} />
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Manage your site configuration and social media presence
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Site Configuration Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg">
                  <Settings size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Site Configuration</h2>
                  <p className="text-slate-500 text-sm">Basic website settings</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Globe size={18} className="text-slate-500" />
                    <span>Site URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-300 text-slate-700 font-medium"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Settings size={18} className="text-slate-500" />
                    <span>Frontend Sorting</span>
                  </label>
                  <select
                    value={formData.frontendSorting}
                    onChange={(e) => handleInputChange('frontendSorting', e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-300 text-slate-700 font-medium"
                  >
                    <option value="Random">Random</option>
                    <option value="Name A-Z">Name A-Z</option>
                    <option value="Name Z-A">Name Z-A</option>
                    <option value="Price Low to High">Price Low to High</option>
                    <option value="Price High to Low">Price High to Low</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Package size={18} className="text-slate-500" />
                    <span>Parcel Grouping (Product Count)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.parcelGrouping}
                    onChange={(e) => handleInputChange('parcelGrouping', e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-300 text-slate-700 font-medium"
                    placeholder="Enter number of products"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                    <Clock size={18} className="text-slate-500" />
                    <span>Slider Speed (in Seconds)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.sliderSpeed}
                    onChange={(e) => handleInputChange('sliderSpeed', e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-300 text-slate-700 font-medium"
                    placeholder="Enter speed in seconds"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg">
                  <Share2 size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Social Media Links</h2>
                  <p className="text-slate-500 text-sm">Connect your social accounts</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {socialMediaFields.map((field) => {
                  const Icon = field?.icon;
                  return (
                    <div key={field?.key}>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                        <div className={`p-2 bg-gradient-to-r ${field?.color} rounded-lg shadow-sm`}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <span>{field?.label}</span>
                      </label>
                      <input
                        type="url"
                        value={formData[field?.key]}
                        onChange={(e) => handleInputChange(field?.key, e?.target?.value)}
                        className="w-full px-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-700 font-medium"
                        placeholder={field?.placeholder}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpdateItem}
            disabled={isLoading}
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 text-lg transform ${
              isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed scale-95' 
                : clickedButton === "save"
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg scale-95'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105'
            } shadow-lg`}
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isLoading 
                ? 'bg-slate-200' 
                : 'bg-white/20'
            }`}>
              <Save size={20} className={isLoading ? 'text-slate-400' : 'text-white'} />
            </div>
            <span>{isLoading ? 'Updating Settings...' : 'Save All Changes'}</span>
            {isLoading && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;