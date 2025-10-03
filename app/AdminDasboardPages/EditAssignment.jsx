import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react";

const EditAssignment = ({ onBack, assignmentId, assignmentData }) => {
  const [formData, setFormData] = useState({
    collectionTitle: "INVISIBLE COLLECTI",
    passwordCode: "202cb962ac59075b",
  });

  const [collectionProductsExpanded, setCollectionProductsExpanded] =
    useState(true);
  const [selectedProductsExpanded, setSelectedProductsExpanded] =
    useState(true);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // Sample collection products data

  const collectionProducts = [
    {
      id: "SW9K0527",
      image: "/api/placeholder/80/80",
      lotNo: "SW9K0527",
      title: "GOLD SWAROVSKI EAR-RINGS",
      designNo: "0000",
      details: {
        style: "-",
        size: "-",
        category: "ICATEGORY",
        subcategory: "SWAROV.HANDMADE",
        weight: "-",
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

  // Sample selected products data
  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: "SW9K0119",
      image: "/api/placeholder/80/80",
      lotNo: "SW9K0119",
      title: "GOLD SWAROVSKI EAR-RINGS",
      designNo: "0000",
      details: {
        style: "-",
        size: "-",
        category: "ICATEGORY",
        subcategory: "SWAROV.HANDMADE",
        weight: "-",
        stkLedger: "09 KARAT SWAROVSKI ORNAMENTS",
      },
      weight: {
        gross: "17.210",
        stone: "10.830",
        other: "0.000",
        net: "6.380",
        pure: "2.461",
        pcs: "1",
        qty: "2",
      },
      amount: {
        metal: "7383.00",
        other: "0.00",
        stone: "6253.00",
        charge: "6380.00",
        calculatedTotal: "20016.00",
        variableTotal: "94800.00",
        estimatedTotal: "79000.00",
      },
      selected: true,
    },
    {
      id: "SW9K0108",
      image: "/api/placeholder/80/80",
      lotNo: "SW9K0108",
      title: "GOLD SWAROVSKI EAR-RINGS",
      designNo: "0000",
      details: {
        style: "-",
        size: "-",
        category: "ICATEGORY",
        subcategory: "SWAROV.HANDMADE",
        weight: "-",
        stkLedger: "09 KARAT SWAROVSKI ORNAMENTS",
      },
      weight: {
        gross: "28.910",
        stone: "16.050",
        other: "0.000",
        net: "12.860",
        pure: "4.960",
        pcs: "1",
        qty: "2",
      },
      amount: {
        metal: "24819.80",
        other: "0.00",
        stone: "9423.00",
        charge: "1363160.00",
        calculatedTotal: "1397402.80",
        variableTotal: "127200.00",
        estimatedTotal: "106000.00",
      },
      selected: true,
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateItem = () => {
    console.log("Updating assignment:", { formData, selectedProducts });
  };

  const handleAssignUsers = () => {
    console.log("Assigning users:", { formData, selectedProducts });
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const filteredCollectionProducts = collectionProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.lotNo.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Back to Assignment List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-full mx-auto space-y-6">
          {/* Form Fields */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                />
              </div>
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
                />
                <p className="text-sm text-gray-500 mt-1">
                  (If blank passcode will be same)
                </p>
              </div>
            </div>
          </div>

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
                {/* Search */}
                <div className="mb-4 flex justify-end">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                {/* Table Header */}
                <div className="bg-gray-50 rounded-t-lg border border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 font-medium text-gray-700 text-sm">
                    <div className="col-span-2">Product</div>
                    <div className="col-span-2">Item</div>
                    <div className="col-span-3">Details</div>
                    <div className="col-span-2">Weight</div>
                    <div className="col-span-3">Amount</div>
                  </div>
                </div>

                {/* Product Row */}
                <div className="border-l border-r border-b border-gray-200 rounded-b-lg">
                  {filteredCollectionProducts.map((product) => (
                    <div
                      key={product?.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="grid grid-cols-12 gap-4 px-4 py-4 items-start">
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
                            <strong>{product?.title}</strong>
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
                            <strong>Category :</strong>{" "}
                            {product?.details?.category}
                          </div>
                          <div>
                            <strong>{product?.details?.subcategory}</strong>
                          </div>
                          <div>
                            <strong>Weight :</strong> {product?.details?.weight}
                          </div>
                          <div>
                            <strong>Stk.Ledger :</strong>{" "}
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
                        <div className="col-span-3 text-xs space-y-1">
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
                            <strong>Calculated Total :</strong>{" "}
                            {product?.amount?.calculatedTotal}
                          </div>
                          <div>
                            <strong>Variable Total :</strong>{" "}
                            {product?.amount?.variableTotal} ▼
                          </div>
                          <div>
                            <strong>Estimated Total :</strong>{" "}
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
                {/* Table Header */}
                <div className="bg-gray-50 rounded-t-lg border border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 font-medium text-gray-700 text-sm">
                    <div className="col-span-2">Product</div>
                    <div className="col-span-2">Item</div>
                    <div className="col-span-2">Details</div>
                    <div className="col-span-2">Weight</div>
                    <div className="col-span-3">Amount</div>
                    <div className="col-span-1 text-center">Action</div>
                  </div>
                </div>

                {/* Product Rows */}
                <div className="border-l border-r border-b border-gray-200 rounded-b-lg">
                  {selectedProducts.map((product) => (
                    <div
                      key={product?.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="grid grid-cols-12 gap-4 px-4 py-4 items-start">
                        {/* Product Image */}
                        <div className="col-span-2">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border">
                            <img
                              src={product?.image}
                              alt={product?.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="64" height="64" fill="#f3f4f6"/>
                                    <text x="32" y="35" text-anchor="middle" fill="#6b7280" font-size="10">Product</text>
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
                            <strong>{product?.title}</strong>
                          </div>
                          <div>
                            <strong>Design No :</strong> {product?.designNo}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="col-span-2 text-xs space-y-1">
                          <div>
                            <strong>Style :</strong> {product?.details?.style}
                          </div>
                          <div>
                            <strong>Size :</strong> {product?.details?.size}
                          </div>
                          <div>
                            <strong>Category :</strong>{" "}
                            {product?.details?.category}
                          </div>
                          <div>
                            <strong>{product?.details?.subcategory}</strong>
                          </div>
                          <div>
                            <strong>Weight :</strong> {product?.details?.weight}
                          </div>
                          <div>
                            <strong>Stk Ledger :</strong>{" "}
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
                        <div className="col-span-3 text-xs space-y-1">
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
                            <strong>Calculated Total :</strong>{" "}
                            {product?.amount?.calculatedTotal}
                          </div>
                          <div>
                            <strong>Variable Total :</strong>{" "}
                            {product?.amount?.variableTotal} ▼
                          </div>
                          <div>
                            <strong>Estimated Total :</strong>{" "}
                            {product?.amount?.estimatedTotal}
                          </div>
                        </div>

                        {/* Action */}
                        <div className="col-span-1 flex justify-center">
                          <input
                            type="checkbox"
                            checked={product.selected}
                            onChange={() => handleProductToggle(product.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleUpdateItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Update Item
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

export default EditAssignment;
