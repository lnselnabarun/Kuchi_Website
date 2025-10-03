import React, { useState } from "react";
import { Upload, Eye, RefreshCw } from "lucide-react";

const ImportExportMaster = ({ onBack }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState("product_gallery");
  const [resultData, setResultData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const masterOptions = [
    { value: "product_gallery", label: "product_gallery" },
    { value: "product_master", label: "product_master" },
    { value: "product_metal_rel", label: "product_metal_rel" },
    { value: "product_stone_rel", label: "product_stone_rel" },
    { value: "product_stone_attr_rel", label: "product_stone_attr_rel" },
  ];

  const currentValues = [
    { name: "Current Value For - product_master", visible: true },
    { name: "Current Value For - product_metal_rel", visible: true },
    { name: "Current Value For - product_stone_rel", visible: true },
    { name: "Current Value For - product_stone_attr_rel", visible: true },
    { name: "Current Value For - product_gallery", visible: true },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleAddItem = () => {
    console.log("Adding item:", { file: uploadedFile, master: selectedMaster });
    // Simulate processing
    setShowResults(true);
    setResultData(["Processing completed successfully"]);
  };

  const handleRefresh = () => {
    setResultData([]);
    setShowResults(false);
  };

  const toggleValueVisibility = (index) => {
    // Toggle visibility logic here
    console.log("Toggling visibility for:", index);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      {/* <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Import/Export Master</h1>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Master Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Upload size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Export Master
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Upload CSV */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="csvFile"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="csvFile"
                      className="flex items-center justify-between w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-gray-500">
                        {uploadedFile ? uploadedFile.name : "Choose File"}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {uploadedFile ? "" : "No file chosen"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Select Master */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select master
                  </label>
                  <select
                    value={selectedMaster}
                    onChange={(e) => setSelectedMaster(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {masterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add Item Button */}
                <button
                  onClick={handleAddItem}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>

            {/* Result Structure Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload size={20} className="text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Result Structure
                    </h2>
                  </div>
                  <button
                    onClick={handleRefresh}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    <RefreshCw size={14} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {!showResults ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No content Found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {resultData.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <p className="text-green-800 text-sm">{result}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Current Values Section */}
          <div className="mt-6 space-y-3">
            {currentValues.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-teal-600 font-medium text-sm">
                    {value.name}
                  </span>
                </div>
                <button
                  onClick={() => toggleValueVisibility(index)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportMaster;
