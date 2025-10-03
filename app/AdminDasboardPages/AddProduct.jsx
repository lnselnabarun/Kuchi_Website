"use client";
import React, { useState } from "react";
import { 
  ShoppingCart, 
  Image as ImageIcon, 
  Plus, 
  ChevronDown,
} from "lucide-react";

const AddProduct = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // Design Type & No
    designType: "NA",
    prefix: "",
    designNo: "",
    
    // Lot Type & No
    lotType: "Select Type",
    lotPrefix: "",
    lotNo: "",
    
    // Show options
    showLot: true,
    showDesign: false,
    
    // Image
    image: null,
    location: "",
    
    // Item details
    itemGroup: "Item Group",
    itemSubGroup: "Item SubGroup",
    itemName: "Item Name",
    itemStyle: "Item Style",
    itemSize: "Item Size",
    itemWeight: "Item Weight",
    itemCategory: "Item Category",
    stockLedger: "Stock Ledger",
    
    // Video URL
    videoUrl: "",
    
    // Description
    description: "",
    
    // Weight details
    pcs: "",
    qty: "",
    grossWt: "",
    netWt: "",
    otherMetalWt: "",
    otherStoneWt: "",
    pureWt: "",
    
    // Weight breakup
    weightBreakupShow: true,
    
    // Price breakup
    priceBreakupShow: true,
    metalAmt: "",
    otherMetalAmt: "",
    otherStoneAmt: "",
    chargeAmt: "",
    totalAmt: "",
    variableAmt: "",
    estimatedAmt: "",
    discountedAmt: "",
    
    // Status
    disable: false,
    outOfStock: false,
    
    // Type
    type: "general",
    
    // Show Price
    showPrice: "calculated",
    
    // Metal Details
    showMetal: true,
    metalDetails: [
      { metal: "", netWeight: "", purity: "", purityPercentage: "", pureWeight: "" }
    ],
    
    // Charge Details  
    showCharge: true,
    chargeDetails: [
      { chargeName: "", esChargeRate: "", esCrateType: "", esChargeAmt: "" }
    ],
    
    // Stone Details
    showStone: true,
    stoneDetails: [
      { 
        stoneName: "", 
        pcs: "", 
        stoneWeight: "", 
        uM: "", 
        gram: "", 
        estSaleRate: "", 
        estSrateType: "", 
        estSaleAmt: "", 
        details: "" 
      }
    ],
    
    // Image Gallery
    imageGallery: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, files) => {
    setFormData(prev => ({
      ...prev,
      [field]: files
    }));
  };

  const addMetalDetail = () => {
    setFormData(prev => ({
      ...prev,
      metalDetails: [...prev.metalDetails, { metal: "", netWeight: "", purity: "", purityPercentage: "", pureWeight: "" }]
    }));
  };

  const addChargeDetail = () => {
    setFormData(prev => ({
      ...prev,
      chargeDetails: [...prev.chargeDetails, { chargeName: "", esChargeRate: "", esCrateType: "", esChargeAmt: "" }]
    }));
  };

  const addStoneDetail = () => {
    setFormData(prev => ({
      ...prev,
      stoneDetails: [...prev.stoneDetails, { 
        stoneName: "", 
        pcs: "", 
        stoneWeight: "", 
        uM: "", 
        gram: "", 
        estSaleRate: "", 
        estSrateType: "", 
        estSaleAmt: "", 
        details: "" 
      }]
    }));
  };

  const handleMetalDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.metalDetails];
    updatedDetails[index][field] = value;
    setFormData(prev => ({
      ...prev,
      metalDetails: updatedDetails
    }));
  };

  const handleChargeDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.chargeDetails];
    updatedDetails[index][field] = value;
    setFormData(prev => ({
      ...prev,
      chargeDetails: updatedDetails
    }));
  };

  const handleStoneDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.stoneDetails];
    updatedDetails[index][field] = value;
    setFormData(prev => ({
      ...prev,
      stoneDetails: updatedDetails
    }));
  };

  // Component for required field label
  const RequiredLabel = ({ children, required = false }) => (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <ShoppingCart size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
                <p className="text-sm text-gray-500">Create a new product entry</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Design Type & No */}
              <div className="space-y-4">
                <RequiredLabel required>Design Type & No</RequiredLabel>
                <select 
                  value={formData?.designType}
                  onChange={(e) => handleInputChange('designType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Design Type</option>
                  <option value="NA">NA</option>
                  <option value="Ring">Ring</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Earring">Earring</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Prefix *"
                    value={formData?.prefix}
                    onChange={(e) => handleInputChange('prefix', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Design No *"
                    value={formData?.designNo}
                    onChange={(e) => handleInputChange('designNo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Lot Type & No */}
              <div className="space-y-4">
                <RequiredLabel>Lot Type & No</RequiredLabel>
                <select 
                  value={formData?.lotType}
                  onChange={(e) => handleInputChange('lotType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Select Type">Select Type</option>
                  <option value="Batch A">Batch A</option>
                  <option value="Batch B">Batch B</option>
                  <option value="Custom">Custom</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Prefix"
                    value={formData?.lotPrefix}
                    onChange={(e) => handleInputChange('lotPrefix', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Lot No"
                    value={formData?.lotNo}
                    onChange={(e) => handleInputChange('lotNo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Show Options & Image */}
              <div className="space-y-4">
                <RequiredLabel required>Show Options</RequiredLabel>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="show"
                      checked={formData?.showLot}
                      onChange={(e) => {
                        handleInputChange('showLot', true);
                        handleInputChange('showDesign', false);
                      }}
                      className="mr-2"
                      required
                    />
                    <span className="text-sm text-gray-600">Lot</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="show"
                      checked={formData?.showDesign}
                      onChange={(e) => {
                        handleInputChange('showDesign', true);
                        handleInputChange('showLot', false);
                      }}
                      className="mr-2"
                      required
                    />
                    <span className="text-sm text-gray-600">Design</span>
                  </label>
                </div>
                
                <div>
                  <RequiredLabel required>Product Image</RequiredLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('image', e.target.files[0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <RequiredLabel>Location</RequiredLabel>
                  <input
                    type="text"
                    placeholder="Storage Location"
                    value={formData?.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Item Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Item Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <RequiredLabel required>Item Group</RequiredLabel>
                <select 
                  value={formData?.itemGroup}
                  onChange={(e) => handleInputChange('itemGroup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Item Group</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Diamond">Diamond</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item Style</RequiredLabel>
                <select 
                  value={formData?.itemStyle}
                  onChange={(e) => handleInputChange('itemStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Item Style</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Modern">Modern</option>
                  <option value="Antique">Antique</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item SubGroup</RequiredLabel>
                <select 
                  value={formData?.itemSubGroup}
                  onChange={(e) => handleInputChange('itemSubGroup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select SubGroup</option>
                  <option value="SubGroup A">SubGroup A</option>
                  <option value="SubGroup B">SubGroup B</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item Size</RequiredLabel>
                <select 
                  value={formData?.itemSize}
                  onChange={(e) => handleInputChange('itemSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item Name</RequiredLabel>
                <select 
                  value={formData?.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Item Name</option>
                  <option value="Ring">Ring</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Bracelet">Bracelet</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item Weight</RequiredLabel>
                <select 
                  value={formData?.itemWeight}
                  onChange={(e) => handleInputChange('itemWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Weight Range</option>
                  <option value="0-5g">0-5g</option>
                  <option value="5-10g">5-10g</option>
                  <option value="10-20g">10-20g</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Item Category</RequiredLabel>
                <select 
                  value={formData?.itemCategory}
                  onChange={(e) => handleInputChange('itemCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Party">Party</option>
                  <option value="Daily Wear">Daily Wear</option>
                </select>
              </div>

              <div>
                <RequiredLabel required>Stock Ledger</RequiredLabel>
                <select 
                  value={formData?.stockLedger}
                  onChange={(e) => handleInputChange('stockLedger', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Stock Ledger</option>
                  <option value="Main Store">Main Store</option>
                  <option value="Branch Store">Branch Store</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weight & Quantity Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Weight & Quantity Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div>
                  <RequiredLabel required>Pieces (Pcs)</RequiredLabel>
                  <input
                    type="number"
                    value={formData?.pcs}
                    onChange={(e) => handleInputChange('pcs', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter pieces"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <RequiredLabel required>Quantity (Qty)</RequiredLabel>
                  <input
                    type="number"
                    value={formData?.qty}
                    onChange={(e) => handleInputChange('qty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter quantity"
                    required
                    min="1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData?.weightBreakupShow}
                    onChange={(e) => handleInputChange('weightBreakupShow', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">Weight Breakup Show</span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData?.priceBreakupShow}
                    onChange={(e) => handleInputChange('priceBreakupShow', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">Price Breakup Show</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <RequiredLabel required>Gross Weight (Gm)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.grossWt}
                    onChange={(e) => handleInputChange('grossWt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel required>Net Weight (Gm)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.netWt}
                    onChange={(e) => handleInputChange('netWt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Other Metal Wt (Gm)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.otherMetalWt}
                    onChange={(e) => handleInputChange('otherMetalWt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Other Stone Wt (Gm)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.otherStoneWt}
                    onChange={(e) => handleInputChange('otherStoneWt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Pure Weight (Gm)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.pureWt}
                    onChange={(e) => handleInputChange('pureWt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <RequiredLabel>Metal Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.metalAmt}
                    onChange={(e) => handleInputChange('metalAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Other Metal Amt (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.otherMetalAmt}
                    onChange={(e) => handleInputChange('otherMetalAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Other Stone Amt (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.otherStoneAmt}
                    onChange={(e) => handleInputChange('otherStoneAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Charge Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.chargeAmt}
                    onChange={(e) => handleInputChange('chargeAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel required>Total Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.totalAmt}
                    onChange={(e) => handleInputChange('totalAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <RequiredLabel>Variable Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.variableAmt}
                    onChange={(e) => handleInputChange('variableAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Estimated Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.estimatedAmt}
                    onChange={(e) => handleInputChange('estimatedAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div>
                  <RequiredLabel>Discounted Amount (Rs)</RequiredLabel>
                  <input
                    type="number"
                    step="0.01"
                    value={formData?.discountedAmt}
                    onChange={(e) => handleInputChange('discountedAmt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData?.disable}
                      onChange={(e) => handleInputChange('disable', e.target.checked)}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm text-gray-600">Disable Product</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData?.outOfStock}
                      onChange={(e) => handleInputChange('outOfStock', e.target.checked)}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm text-gray-600">Out Of Stock</span>
                  </label>
                </div>

                <div>
                  <RequiredLabel required>Product Type</RequiredLabel>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="general"
                        checked={formData?.type === 'general'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">General</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="collection"
                        checked={formData?.type === 'collection'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">Collection</span>
                    </label>
                  </div>
                </div>

                <div>
                  <RequiredLabel required>Show Price</RequiredLabel>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showPrice"
                        value="calculated"
                        checked={formData?.showPrice === 'calculated'}
                        onChange={(e) => handleInputChange('showPrice', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">Calculated</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showPrice"
                        value="variable"
                        checked={formData?.showPrice === 'variable'}
                        onChange={(e) => handleInputChange('showPrice', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">Variable</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showPrice"
                        value="estimated"
                        checked={formData?.showPrice === 'estimated'}
                        onChange={(e) => handleInputChange('showPrice', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">Estimated</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Additional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <RequiredLabel>Video URL</RequiredLabel>
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={formData?.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <RequiredLabel>Description</RequiredLabel>
                <textarea
                  rows="4"
                  placeholder="Enter detailed product description..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center">
              <ImageIcon size={20} className="text-gray-600 mr-2" />
              Image Gallery (Select Multiple Images)
            </h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange('imageGallery', Array.from(e.target.files))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">Select multiple images to create a product gallery</p>
          </div>

          {/* Metal Details Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center border-b border-gray-200 pb-2">
                <ChevronDown size={20} className="text-gray-600 mr-2" />
                <ShoppingCart size={20} className="text-gray-600 mr-2" />
                Metal Details
                <input
                  type="checkbox"
                  checked={formData?.showMetal}
                  onChange={(e) => handleInputChange('showMetal', e.target.checked)}
                  className="ml-4 rounded"
                />
                <span className="text-sm text-gray-600 ml-2">Show Metal</span>
              </h2>
              <button
                onClick={addMetalDetail}
                className="flex items-center space-x-1 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Add Metal</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Metal Type *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Net Weight (gm) *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Purity *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Purity Percentage *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Pure Weight (gm) *
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData?.metalDetails?.map((detail, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 border-r border-gray-300">
                        <select
                          value={detail?.metal}
                          onChange={(e) => handleMetalDetailChange(index, 'metal', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Metal</option>
                          <option value="Gold">Gold</option>
                          <option value="Silver">Silver</option>
                          <option value="Platinum">Platinum</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail.netWeight}
                          onChange={(e) => handleMetalDetailChange(index, 'netWeight', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <select
                          value={detail.purity}
                          onChange={(e) => handleMetalDetailChange(index, 'purity', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Purity</option>
                          <option value="22K">22K</option>
                          <option value="18K">18K</option>
                          <option value="14K">14K</option>
                          <option value="925">925 Silver</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail.purityPercentage}
                          onChange={(e) => handleMetalDetailChange(index, 'purityPercentage', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          required
                          min="0"
                          max="100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={detail.pureWeight}
                          onChange={(e) => handleMetalDetailChange(index, 'pureWeight', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charge Details Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center border-b border-gray-200 pb-2">
                <ChevronDown size={20} className="text-gray-600 mr-2" />
                <ShoppingCart size={20} className="text-gray-600 mr-2" />
                Charge Details
                <input
                  type="checkbox"
                  checked={formData?.showCharge}
                  onChange={(e) => handleInputChange('showCharge', e.target.checked)}
                  className="ml-4 rounded"
                />
                <span className="text-sm text-gray-600 ml-2">Show Charge</span>
              </h2>
              <button
                onClick={addChargeDetail}
                className="flex items-center space-x-1 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Add Charge</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Charge Name *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      ES Charge Rate *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      ES Rate Type *
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      ES Charge Amount *
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData?.chargeDetails?.map((detail, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 border-r border-gray-300">
                        <select
                          value={detail?.chargeName}
                          onChange={(e) => handleChargeDetailChange(index, 'chargeName', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Charge</option>
                          <option value="Making Charge">Making Charge</option>
                          <option value="Stone Setting">Stone Setting</option>
                          <option value="Polish">Polish</option>
                          <option value="Certification">Certification</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.esChargeRate}
                          onChange={(e) => handleChargeDetailChange(index, 'esChargeRate', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <select
                          value={detail?.esCrateType}
                          onChange={(e) => handleChargeDetailChange(index, 'esCrateType', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Per Gram">Per Gram</option>
                          <option value="Percentage">Percentage</option>
                          <option value="Fixed">Fixed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.esChargeAmt}
                          onChange={(e) => handleChargeDetailChange(index, 'esChargeAmt', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stone Details Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center border-b border-gray-200 pb-2">
                <ChevronDown size={20} className="text-gray-600 mr-2" />
                <ShoppingCart size={20} className="text-gray-600 mr-2" />
                Stone Details
                <input
                  type="checkbox"
                  checked={formData?.showStone}
                  onChange={(e) => handleInputChange('showStone', e.target.checked)}
                  className="ml-4 rounded"
                />
                <span className="text-sm text-gray-600 ml-2">Show Stone</span>
              </h2>
              <button
                onClick={addStoneDetail}
                className="flex items-center space-x-1 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Add Stone</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Stone Name *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Pieces *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Stone Weight *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Unit *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Gram *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Est Sale Rate *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Est Rate Type *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
                      Est Sale Amount *
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData?.stoneDetails?.map((detail, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-3 py-3 border-r border-gray-300">
                        <select
                          value={detail?.stoneName}
                          onChange={(e) => handleStoneDetailChange(index, 'stoneName', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                          required
                        >
                          <option value="">Select Stone</option>
                          <option value="Diamond">Diamond</option>
                          <option value="Ruby">Ruby</option>
                          <option value="Emerald">Emerald</option>
                          <option value="Sapphire">Sapphire</option>
                          <option value="Pearl">Pearl</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          value={detail?.pcs}
                          onChange={(e) => handleStoneDetailChange(index, 'pcs', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[80px]"
                          placeholder="0"
                          required
                          min="1"
                        />
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.stoneWeight}
                          onChange={(e) => handleStoneDetailChange(index, 'stoneWeight', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <select
                          value={detail?.uM}
                          onChange={(e) => handleStoneDetailChange(index, 'uM', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[80px]"
                          required
                        >
                          <option value="">Unit</option>
                          <option value="Carat">Carat</option>
                          <option value="Gram">Gram</option>
                          <option value="Piece">Piece</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.gram}
                          onChange={(e) => handleStoneDetailChange(index, 'gram', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[80px]"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.estSaleRate}
                          onChange={(e) => handleStoneDetailChange(index, 'estSaleRate', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <select
                          value={detail?.estSrateType}
                          onChange={(e) => handleStoneDetailChange(index, 'estSrateType', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
                          required
                        >
                          <option value="">Rate Type</option>
                          <option value="Per Carat">Per Carat</option>
                          <option value="Per Gram">Per Gram</option>
                          <option value="Per Piece">Per Piece</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          value={detail?.estSaleAmt}
                          onChange={(e) => handleStoneDetailChange(index, 'estSaleAmt', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
                          placeholder="0.00"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="text"
                          value={detail?.details}
                          onChange={(e) => handleStoneDetailChange(index, 'details', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                          placeholder="Additional details"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Item Button */}
          <div className="mb-8 text-center">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg shadow-md">
              Add Item to Product
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center border-t pt-6">
            <p className="text-sm text-gray-500">
              * Required fields must be filled to save the product
            </p>
            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Form Data:', formData);
                  // Handle form submission here
                  alert('Product saved successfully! (This is a demo)');
                }}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors font-medium shadow-md"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;