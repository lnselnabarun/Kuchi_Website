import React, { useState } from "react";
import { ChevronDown, ChevronUp, IndianRupee } from "lucide-react";

const MetalRateSetting = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState({
    silver: true,
    platinum: true,
    gold: true,
  });

  const [rates, setRates] = useState({
    silver: {
      "SILVER MELTING 93.00% - [SM9300]": "93",
      "SILVER MELTING 92.50% - [SM9250]": "93",
      "SILVER MELTING 99.50% - [SM9950]": "100",
    },
    gold: {
      "GOLD MELTING 99.50% - [GM9950]": "9800",
      "GOLD MELTING 99.90 - [GM9990]": "9900",
      "GOLD MELTING 24 KARAT - [GM24KT]": "9800",
      "GOLD MELTING 100% - [GM1000]": "9800",
      "GOLD MELTING 09 KARAT - [GM09KT]": "4125",
      "GOLD MELTING 14 KARAT - [GM14KT]": "6188",
      "GOLD MELTING 22 KARATS - [GM22KT]": "9488",
      "GOLD MELTING 20 KARAT - [GM20KT]": "8663",
      "GOLD MELTING 18 KARAT - [GM18KT]": "7838",
    },
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleRateChange = (metal, type, value) => {
    setRates((prev) => ({
      ...prev,
      [metal]: {
        ...prev[metal],
        [type]: value,
      },
    }));
  };

  const handleUpdateItem = () => {
    alert("Metal rates updated successfully!");
  };

  const renderMetalSection = (metal, title, icon, color) => {
    const isExpanded = expandedSections[metal];
    const metalRates = rates[metal] || {};

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection(metal)}
          className={`w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors ${color}`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-100`}>{icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {Object.keys(metalRates).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(metalRates).map(([type, rate], index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {type}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) =>
                          handleRateChange(metal, type, e.target.value)
                        }
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right font-medium"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <IndianRupee size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No purity found</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        {/* <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 shadow-sm border border-gray-200"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Metal Rate Setting
              </h1>
              <p className="text-gray-600 mt-1">
                Configure pricing for different metal purities
              </p>
            </div>
          </div>
        </div> */}

        {/* Metal Sections */}
        <div className="space-y-6">
          {/* Silver Section */}
          {renderMetalSection(
            "silver",
            "Rate For SILVER",
            <IndianRupee size={18} className="text-gray-600" />,
            "border-l-4 border-l-gray-400"
          )}

          {/* Platinum Section */}
          {renderMetalSection(
            "platinum",
            "Rate For PLATINUM",
            <IndianRupee size={18} className="text-gray-600" />,
            "border-l-4 border-l-gray-500"
          )}

          {/* Gold Section */}
          {renderMetalSection(
            "gold",
            "Rate For GOLD",
            <IndianRupee size={18} className="text-yellow-600" />,
            "border-l-4 border-l-yellow-500"
          )}
        </div>

        {/* Update Button */}
        <div className="mt-8 flex justify-start">
          <button
            onClick={handleUpdateItem}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Update Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetalRateSetting;
