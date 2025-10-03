import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AddAssignment = ({ onBack }) => {
  const [collectionProductsExpanded, setCollectionProductsExpanded] =
    useState(true);
  const [selectedProductsExpanded, setSelectedProductsExpanded] =
    useState(true);
  const [createCollectionExpanded, setCreateCollectionExpanded] =
    useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    collectionTitle: "",
    passwordCode: "",
    status: "Active",
  });

  const collectionProducts = [
    {
      id: "SW9K0527",
      image: "/api/placeholder/80/80",
      lotNo: "SW9K0527",
      title: "GOLD SWAROVSKI EAR-RINGS",
      designNo: "0000",
      details: {
        style: "",
        size: "",
        category: "CATEGORY",
        subcategory: "SWAROV.HANDMADE",
        weight: "",
        stkLedger: "09 KARAT SWAROVSKI ORNAMENTS",
      },
      weight: {
        gross: "11.090",
        stone: "1.900",
        other: "0.000",
        net: "9.190",
        pure: "3.544",
        pcs: "1",
        qty: "2",
      },
      amount: {
        metal: "12866.00",
        other: "0.00",
        stone: "950.00",
        charge: "9190.00",
        calculatedTotal: "23006.00",
        variableTotal: "38400.00",
        estimatedTotal: "32000.00",
      },
    },
  ];

  const handleProductSelect = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddToCollection = () => {
    // console.log("Adding to collection:", { formData, selectedProducts });
  };

  const handleAssignUsers = () => {
    // console.log("Assigning users:", { formData, selectedProducts }); 
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-full mx-auto space-y-6">
          {/* Collection Product Details Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            <button
              onClick={() =>
                setCollectionProductsExpanded(!collectionProductsExpanded)
              }
              className="w-full bg-teal-50 border-b border-teal-200 px-6 py-4 flex items-center justify-between hover:bg-teal-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {collectionProductsExpanded ? (
                  <ChevronDown size={16} className="text-teal-600" />
                ) : (
                  <ChevronUp size={16} className="text-teal-600" />
                )}
                <span className="font-medium text-gray-900">
                  🐾 Collection Product Details
                </span>
              </div>
            </button>

            {collectionProductsExpanded && (
              <div className="p-6">
                {/* Table Header */}
                <div className="bg-gray-50 rounded-t-lg border border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 font-medium text-gray-700 text-sm">
                    <div className="col-span-1 text-center">Select</div>
                    <div className="col-span-2">Product</div>
                    <div className="col-span-2">Item</div>
                    <div className="col-span-3">Details</div>
                    <div className="col-span-2">Weight</div>
                    <div className="col-span-2">Amount</div>
                  </div>
                </div>

                {/* Product Rows */}
                <div className="border-l border-r border-b border-gray-200 rounded-b-lg">
                  {collectionProducts.map((product) => (
                    <div
                      key={product?.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="grid grid-cols-12 gap-4 px-4 py-4 items-start">
                        {/* Checkbox */}
                        <div className="col-span-1 flex justify-center pt-2">
                          <input
                            type="checkbox"
                            checked={selectedProducts.some(
                              (p) => p?.id === product?.id
                            )}
                            onChange={() => handleProductSelect(product)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {/* Product Image */}
                        <div className="col-span-2">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border">
                            <img
                              src={product?.image}
                              alt={product?.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="80" height="80" fill="#f3f4f6"/>
                                    <text x="40" y="45" text-anchor="middle" fill="#6b7280" font-size="12">Product</text>
                                  </svg>
                                `)}`;
                              }}
                            />
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="col-span-2 text-xs space-y-1">
                          <div>
                            <strong>Lot No :</strong> {product?.lotNo}
                          </div>
                          <div>
                            <strong>Title :</strong> {product?.title}
                          </div>
                          <div>
                            <strong>Design No :</strong> {product?.designNo}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="col-span-3 text-xs space-y-1">
                          <div>
                            <strong>Style :</strong> {product?.details?.style}
                          </div>
                          <div>
                            <strong>Size :</strong> {product?.details?.size}
                          </div>
                          <div>
                            <strong>Category :</strong>
                            {product?.details?.category}
                          </div>
                          <div>
                            <strong>Subcategory :</strong>
                            {product?.details?.subcategory}
                          </div>
                          <div>
                            <strong>Weight :</strong> {product?.details?.weight}
                          </div>
                          <div>
                            <strong>Stk.Ledger :</strong>
                            {product?.details?.stkLedger}
                          </div>
                        </div>

                        {/* Weight */}
                        <div className="col-span-2 text-xs space-y-1">
                          <div>
                            <strong>Gross :</strong> {product?.weight?.gross}
                          </div>
                          <div>
                            <strong>Stone :</strong> {product?.weight?.stone}
                          </div>
                          <div>
                            <strong>Other :</strong> {product?.weight?.other}
                          </div>
                          <div>
                            <strong>Net :</strong> {product?.weight?.net}
                          </div>
                          <div>
                            <strong>Pure :</strong> {product?.weight?.pure}
                          </div>
                          <div>
                            <strong>Pcs :</strong> {product?.weight?.pcs}
                          </div>
                          <div>
                            <strong>Qty :</strong> {product?.weight?.qty}
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="col-span-2 text-xs space-y-1">
                          <div>
                            <strong>Metal :</strong> {product?.amount?.metal}
                          </div>
                          <div>
                            <strong>Other :</strong> {product?.amount?.other}
                          </div>
                          <div>
                            <strong>Stone :</strong> {product?.amount?.stone}
                          </div>
                          <div>
                            <strong>Charge :</strong> {product?.amount?.charge}
                          </div>
                          <div>
                            <strong>Calculated Total :</strong>
                            {product?.amount?.calculatedTotal}
                          </div>
                          <div>
                            <strong>Variable Total :</strong>
                            {product?.amount?.variableTotal}
                          </div>
                          <div>
                            <strong>Estimated Total :</strong>
                            {product?.amount?.estimatedTotal}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Product Details Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            <button
              onClick={() =>
                setSelectedProductsExpanded(!selectedProductsExpanded)
              }
              className="w-full bg-teal-50 border-b border-teal-200 px-6 py-4 flex items-center justify-between hover:bg-teal-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {selectedProductsExpanded ? (
                  <ChevronDown size={16} className="text-teal-600" />
                ) : (
                  <ChevronUp size={16} className="text-teal-600" />
                )}
                <span className="font-medium text-gray-900">
                  🐾 Selected Product Details
                </span>
              </div>
            </button>

            {selectedProductsExpanded && (
              <div className="p-6">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>
                      No products selected. Please select products from the
                      collection above.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 font-medium text-gray-700 text-sm bg-gray-100 rounded-t-lg">
                      <div className="col-span-2">Product</div>
                      <div className="col-span-2">Item</div>
                      <div className="col-span-3">Details</div>
                      <div className="col-span-2">Weight</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-1">Action</div>
                    </div>

                    {selectedProducts.map((product) => (
                      <div
                        key={product?.id}
                        className="grid grid-cols-12 gap-4 px-4 py-4 items-start border-b border-gray-200 last:border-b-0"
                      >
                        <div className="col-span-2">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border">
                            <img
                              src={product?.image}
                              alt={product?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 text-xs space-y-1">
                          <div>
                            <strong>Lot No :</strong> {product?.lotNo}
                          </div>
                          <div>
                            <strong>Title :</strong> {product?.title}
                          </div>
                        </div>
                        <div className="col-span-3 text-xs">
                          <div>{product?.details?.category}</div>
                        </div>
                        <div className="col-span-2 text-xs">
                          <div>Gross : {product?.weight?.gross}</div>
                        </div>
                        <div className="col-span-2 text-xs">
                          <div>Total : {product?.amount?.calculatedTotal}</div>
                        </div>
                        <div className="col-span-1">
                          <button
                            onClick={() => handleProductSelect(product)}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Create Collection Assignment Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            <button
              onClick={() =>
                setCreateCollectionExpanded(!createCollectionExpanded)
              }
              className="w-full bg-gray-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {createCollectionExpanded ? (
                  <ChevronDown size={16} className="text-gray-600" />
                ) : (
                  <ChevronUp size={16} className="text-gray-600" />
                )}
                <span className="font-medium text-gray-900">
                  🐾 Create Collection assignment
                </span>
              </div>
            </button>

            {createCollectionExpanded && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Collection Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection Title
                    </label>
                    <input
                      type="text"
                      value={formData.collectionTitle}
                      onChange={(e) =>
                        handleInputChange("collectionTitle", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Collection Title"
                    />
                  </div>

                  {/* Password Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Code
                    </label>
                    <input
                      type="text"
                      value={formData.passwordCode}
                      onChange={(e) =>
                        handleInputChange("passwordCode", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Password Code"
                    />
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCollection}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Add to Collection
                  </button>
                  <button
                    onClick={handleAssignUsers}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Assign Users
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;
