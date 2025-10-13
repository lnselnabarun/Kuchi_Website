"use client";
import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  User,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Plus,
  Search,
  Filter,
} from "lucide-react";

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [clickedButton, setClickedButton] = useState("");

  const handleButtonClick = (buttonId, callback) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(""), 200);
    if (callback) callback();
  };

  const orderData = [
    {
      orderNo: "#BSK00001",
      date: "08-09-2017",
      time: "05:45:15",
      user: "santa",
      status: "Completed",
      items: [
        { name: "Gold Ring", quantity: 2, price: "₹15,000" },
        { name: "Diamond Earrings", quantity: 1, price: "₹25,000" },
        { name: "Gold Ring", quantity: 2, price: "₹15,000" },
        { name: "Diamond Earrings", quantity: 1, price: "₹25,000" },
        { name: "Gold Ring", quantity: 2, price: "₹15,000" },
        { name: "Diamond Earrings", quantity: 1, price: "₹25,000" },
      ],
      total: "₹40,000",
      address: "123 Main St, Mumbai, MH 400001",
      phone: "+91 98765 43210",
    },
    {
      orderNo: "#BSK00002",
      date: "13-09-2017",
      time: "04:54:07",
      user: "santa",
      status: "Processing",
      items: [
        { name: "Silver Necklace", quantity: 1, price: "₹8,500" },
        { name: "Pearl Bracelet", quantity: 1, price: "₹12,000" },
      ],
      total: "₹20,500",
      address: "456 Park Ave, Delhi, DL 110001",
      phone: "+91 98765 43211",
    },
    {
      orderNo: "#BSK00000",
      date: "02-02-2018",
      time: "13:06:34",
      user: "",
      status: "Failed",
      items: [{ name: "Platinum Ring", quantity: 1, price: "₹35,000" }],
      total: "₹35,000",
      address: "789 Lake View, Bangalore, KA 560001",
      phone: "+91 98765 43212",
    },
    {
      orderNo: "#BSK00003",
      date: "05-02-2018",
      time: "07:38:35",
      user: "santa",
      status: "Failed",
      items: [
        { name: "Ruby Pendant", quantity: 1, price: "₹18,000" },
        { name: "Gold Chain", quantity: 1, price: "₹22,000" },
      ],
      total: "₹40,000",
      address: "321 Hill Top, Chennai, TN 600001",
      phone: "+91 98765 43213",
    },
    {
      orderNo: "#BSK00003",
      date: "24-02-2020",
      time: "11:18:26",
      user: "Lalit Kulthia",
      status: "Failed",
      items: [{ name: "Emerald Ring", quantity: 1, price: "₹28,000" }],
      total: "₹28,000",
      address: "654 Garden View, Pune, MH 411001",
      phone: "+91 98765 43214",
    },
  ];

  const filteredOrders = orderData.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 ring-1 ring-emerald-200";
      case "processing":
        return "bg-blue-50 text-blue-800 border-blue-200 ring-1 ring-blue-200";
      case "failed":
        return "bg-red-50 text-red-800 border-red-200 ring-1 ring-red-200";
      default:
        return "bg-slate-50 text-slate-800 border-slate-200 ring-1 ring-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle size={14} />;
      case "processing":
        return <Clock size={14} />;
      case "failed":
        return <XCircle size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      {editingOrder ? (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 mr-4 shadow-lg">
                    <Edit size={24} className="text-white" />
                  </div>
                  <span>Edit Order - {editingOrder.orderNo}</span>
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      handleButtonClick("back-edit", () =>
                        setEditingOrder(null)
                      )
                    }
                    className={`px-6 py-3 bg-slate-500 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                      clickedButton === "back-edit"
                        ? "scale-95 bg-slate-600 shadow-lg"
                        : "hover:bg-slate-600 hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Orders</span>
                  </button>
                  <button
                    onClick={() => handleButtonClick("save-edit")}
                    className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                      clickedButton === "save-edit"
                        ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                        : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105"
                    }`}
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                  <Package size={24} className="mr-3 text-blue-600" />
                  Order Items ({editingOrder.items.length} items)
                </h3>
                <button
                  onClick={() => handleButtonClick("add-item")}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                    clickedButton === "add-item"
                      ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                      : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105"
                  }`}
                >
                  <Plus size={18} />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {editingOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-r from-white to-slate-50/50 rounded-2xl border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-sm">
                            <Package size={20} className="text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">
                              Lot: SW9K000{index + 4}
                            </h4>
                            <p className="text-sm text-slate-500">
                              Item #{index + 1}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleButtonClick(`edit-item-${index}`)
                            }
                            className={`p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform ${
                              clickedButton === `edit-item-${index}`
                                ? "scale-90 bg-blue-100"
                                : "hover:scale-110"
                            }`}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleButtonClick(`delete-item-${index}`)
                            }
                            className={`p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform ${
                              clickedButton === `delete-item-${index}`
                                ? "scale-90 bg-red-100"
                                : "hover:scale-110"
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Item Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 block mb-2">
                            Item Name
                          </label>
                          <input
                            type="text"
                            defaultValue={item?.name}
                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white transition-all duration-300 text-slate-700 font-medium"
                            placeholder="Enter item name"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-slate-700 block mb-2">
                            Quantity
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              defaultValue={item?.quantity}
                              className="flex-1 px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-center font-medium"
                              min="1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-slate-700 block mb-2">
                            Unit Price
                          </label>
                          <input
                            type="text"
                            defaultValue={item?.price}
                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white font-medium"
                            placeholder="₹0.00"
                          />
                        </div>
                      </div>

                      {/* Item Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-slate-200/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0">
                          <div className="text-sm text-slate-600">
                            SKU:
                            <span className="font-semibold text-slate-800">
                              JWL{1000 + index}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            Category:
                            <span className="font-semibold text-slate-800">
                              Jewelry
                            </span>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-sm text-slate-600">Item Total</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            {item?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total Section */}
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200/50 shadow-lg">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2 font-medium">
                      Total Items
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {editingOrder?.items?.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2 font-medium">
                      Total Quantity
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {editingOrder.items.reduce(
                        (sum, item) => sum + item?.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2 font-medium">
                      Grand Total
                    </p>
                    <p className="text-4xl font-bold text-emerald-600">
                      {editingOrder?.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Details Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                <User size={24} className="mr-3 text-purple-600" />
                Billing Details
              </h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Member Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingOrder?.user || "Sa"}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                      placeholder="Enter member name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Email Id
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="email"
                        defaultValue="santa@insel.net"
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Mobile No
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="tel"
                        defaultValue={editingOrder?.phone}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <textarea
                        defaultValue={editingOrder?.address}
                        rows="3"
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white resize-none font-medium"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        defaultValue="India"
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        defaultValue="Kolkata"
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      defaultValue="70079"
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                <Clock size={24} className="mr-3 text-amber-600" />
                Order Status
              </h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Current Status
                  </label>
                  <select
                    defaultValue={editingOrder?.status?.toLowerCase()}
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white font-medium"
                  >
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Order Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2017-09-08"
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Order Time
                  </label>
                  <input
                    type="time"
                    defaultValue="05:45"
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                onClick={() =>
                  handleButtonClick("cancel-edit", () => setEditingOrder(null))
                }
                className={`px-8 py-4 bg-slate-500 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                  clickedButton === "cancel-edit"
                    ? "scale-95 bg-slate-600 shadow-lg"
                    : "hover:bg-slate-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                <X size={20} />
                <span>Cancel</span>
              </button>
              <button
                onClick={() => handleButtonClick("update-order")}
                className={`px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                  clickedButton === "update-order"
                    ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                    : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105"
                }`}
              >
                <Save size={20} />
                <span>Update Order</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 mr-4 shadow-lg ring-4 ring-cyan-200/50">
                    <ShoppingCart size={28} className="text-white" />
                  </div>
                  Order Management
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleButtonClick("export")}
                    className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                      clickedButton === "export"
                        ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                        : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105"
                    }`}
                  >
                    <Download size={18} />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => handleButtonClick("refresh")}
                    className={`px-6 py-3 bg-white/80 text-slate-700 rounded-2xl font-semibold border border-slate-200 transition-all duration-300 flex items-center space-x-2 transform ${
                      clickedButton === "refresh"
                        ? "scale-95 bg-slate-100 shadow-lg"
                        : "hover:bg-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <RefreshCw size={18} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200/60">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search orders by order number or user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white font-medium text-slate-700"
                  />
                </div>
                <div className="relative">
                  <Filter
                    size={20}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white font-medium text-slate-700"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
            <div className="block lg:hidden">
              {filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200/50 last:border-b-0"
                >
                  <div className="p-6 hover:bg-slate-50/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg">
                          <User size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-cyan-600">
                            {order?.orderNo}
                          </div>
                          <div className="text-sm text-slate-500">
                            {order?.user || "Guest"}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                          order?.status
                        )}`}
                      >
                        {getStatusIcon(order?.status)}
                        <span className="ml-1.5">{order?.status}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-slate-500 font-medium">
                          Date:
                        </span>
                        <div className="font-semibold text-slate-800">
                          {order?.date}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">
                          Time:
                        </span>
                        <div className="font-semibold text-slate-800">
                          {order?.time}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">
                          Items:
                        </span>
                        <div className="font-semibold text-slate-800">
                          {order?.items?.length}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">
                          Total:
                        </span>
                        <div className="font-bold text-emerald-600 text-lg">
                          {order?.total}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          handleButtonClick(`details-${index}`, () =>
                            setExpandedOrder(
                              expandedOrder === index ? null : index
                            )
                          )
                        }
                        className={`flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                          clickedButton === `details-${index}`
                            ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                            : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                        }`}
                      >
                        <Eye size={16} />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() =>
                          handleButtonClick(`edit-${index}`, () =>
                            setEditingOrder(order)
                          )
                        }
                        className={`p-3 bg-emerald-500 text-white rounded-2xl transition-all duration-300 transform ${
                          clickedButton === `edit-${index}`
                            ? "scale-90 bg-emerald-600 shadow-lg"
                            : "hover:bg-emerald-600 hover:scale-110"
                        }`}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleButtonClick(`delete-${index}`)}
                        className={`p-3 bg-red-500 text-white rounded-2xl transition-all duration-300 transform ${
                          clickedButton === `delete-${index}`
                            ? "scale-90 bg-red-600 shadow-lg"
                            : "hover:bg-red-600 hover:scale-110"
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {expandedOrder === index && (
                      <div className="mt-6 pt-6 border-t border-slate-200/50 space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                            <Package size={18} className="mr-2 text-blue-600" />
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order?.items?.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-slate-800 truncate">
                                    {item?.name}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    Qty: {item?.quantity}
                                  </div>
                                </div>
                                <div className="font-bold text-emerald-600 text-lg ml-3">
                                  {item?.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                            <User size={18} className="mr-2 text-purple-600" />
                            Customer Details
                          </h4>
                          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                            <div className="text-sm text-slate-500 mb-1 font-medium">
                              Address :
                            </div>
                            <div className="text-slate-800 mb-3 font-medium">
                              {order?.address}
                            </div>
                            <div className="text-sm text-slate-500 mb-1 font-medium">
                              Phone :
                            </div>
                            <div className="text-slate-800 font-medium">
                              {order?.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              handleButtonClick(`complete-${index}`)
                            }
                            className={`px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                              clickedButton === `complete-${index}`
                                ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                                : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <CheckCircle size={14} />
                            <span>Complete</span>
                          </button>
                          <button
                            onClick={() =>
                              handleButtonClick(`process-${index}`)
                            }
                            className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                              clickedButton === `process-${index}`
                                ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                                : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <Clock size={14} />
                            <span>Processing</span>
                          </button>
                          <button
                            onClick={() => handleButtonClick(`fail-${index}`)}
                            className={`px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                              clickedButton === `fail-${index}`
                                ? "scale-95 from-red-600 to-pink-700 shadow-lg"
                                : "hover:from-red-600 hover:to-pink-700 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <XCircle size={14} />
                            <span>Failed</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200/60">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      #
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      Order No
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      Order Date
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      User
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      Order Details
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-800 tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredOrders.map((order, index) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-slate-50/50 transition-all duration-300 group">
                        <td className="px-6 py-5 text-sm text-slate-800 font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-lg font-bold text-cyan-600">
                            {order?.orderNo}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold text-slate-800 flex items-center">
                              <CalendarIcon
                                size={16}
                                className="mr-2 text-slate-500"
                              />
                              {order?.date}
                            </div>
                            <div className="text-sm text-slate-500 flex items-center mt-1">
                              <Clock size={14} className="mr-2" />
                              {order?.time}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                              <User size={16} className="text-white" />
                            </div>
                            <span className="text-sm text-slate-600 font-medium italic">
                              {order?.user || "Guest"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                              order?.status
                            )}`}
                          >
                            {getStatusIcon(order?.status)}
                            <span className="ml-1.5">{order?.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              handleButtonClick(`details-table-${index}`, () =>
                                setExpandedOrder(
                                  expandedOrder === index ? null : index
                                )
                              )
                            }
                            className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 transform ${
                              clickedButton === `details-table-${index}`
                                ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                                : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <Eye size={16} className="mr-2" />
                            Details
                            <ChevronDown
                              size={16}
                              className={`ml-2 transition-transform duration-300 ${
                                expandedOrder === index ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex space-x-3">
                            <button
                              onClick={() =>
                                handleButtonClick(`edit-table-${index}`, () =>
                                  setEditingOrder(order)
                                )
                              }
                              className={`p-3 bg-emerald-500 text-white rounded-2xl transition-all duration-300 transform ${
                                clickedButton === `edit-table-${index}`
                                  ? "scale-90 bg-emerald-600 shadow-lg"
                                  : "hover:bg-emerald-600 hover:scale-110"
                              }`}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleButtonClick(`delete-table-${index}`)
                              }
                              className={`p-3 bg-red-500 text-white rounded-2xl transition-all duration-300 transform ${
                                clickedButton === `delete-table-${index}`
                                  ? "scale-90 bg-red-600 shadow-lg"
                                  : "hover:bg-red-600 hover:scale-110"
                              }`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expandedOrder === index && (
                        <tr className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                          <td colSpan="7" className="px-6 py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Order Items */}
                              <div className="bg-white/80 rounded-3xl p-6 border border-slate-200/60 shadow-lg">
                                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                  <Package
                                    size={24}
                                    className="mr-3 text-blue-600"
                                  />
                                  Order Items
                                </h4>
                                <div className="space-y-4">
                                  {order.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50"
                                    >
                                      <div className="flex-1">
                                        <div className="font-semibold text-slate-800 text-lg">
                                          {item?.name}
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium">
                                          Quantity: {item?.quantity}
                                        </div>
                                      </div>
                                      <div className="text-xl font-bold text-emerald-600">
                                        {item?.price}
                                      </div>
                                    </div>
                                  ))}
                                  <div className="border-t border-slate-200 pt-4 mt-6">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xl font-bold text-slate-800">
                                        Total Amount:
                                      </span>
                                      <span className="text-2xl font-bold text-emerald-600">
                                        {order?.total}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white/80 rounded-3xl p-6 border border-slate-200/60 shadow-lg">
                                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                  <User
                                    size={24}
                                    className="mr-3 text-purple-600"
                                  />
                                  Customer Details
                                </h4>
                                <div className="space-y-6">
                                  <div>
                                    <label className="text-sm font-semibold text-slate-600 block mb-2">
                                      Customer Address
                                    </label>
                                    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                                      <span className="text-slate-800 font-medium">
                                        {order?.address}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold text-slate-600 block mb-2">
                                      Phone Number
                                    </label>
                                    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                                      <span className="text-slate-800 font-medium">
                                        {order?.phone}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                              <button
                                onClick={() =>
                                  handleButtonClick(`complete-table-${index}`)
                                }
                                className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                                  clickedButton === `complete-table-${index}`
                                    ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                                    : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:scale-105"
                                }`}
                              >
                                <CheckCircle size={18} />
                                <span>Mark as Completed</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleButtonClick(`process-table-${index}`)
                                }
                                className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                                  clickedButton === `process-table-${index}`
                                    ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                                    : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105"
                                }`}
                              >
                                <Clock size={18} />
                                <span>Mark as Processing</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleButtonClick(`fail-table-${index}`)
                                }
                                className={`px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                                  clickedButton === `fail-table-${index}`
                                    ? "scale-95 from-red-600 to-pink-700 shadow-lg"
                                    : "hover:from-red-600 hover:to-pink-700 hover:shadow-xl hover:scale-105"
                                }`}
                              >
                                <XCircle size={18} />
                                <span>Mark as Failed</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShoppingCart size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  No Orders Found
                </h3>
                <p className="text-slate-500 font-medium">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>

          {filteredOrders.length > 0 && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 px-8 py-6">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600 text-center sm:text-left font-medium">
                  Showing <span className="font-bold text-slate-800">1</span> to
                  <span className="font-bold text-slate-800">
                    {filteredOrders?.length}
                  </span>
                  of
                  <span className="font-bold text-slate-800">
                    {filteredOrders?.length}
                  </span>
                  results
                </div>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => handleButtonClick("prev-page")}
                    className={`px-6 py-3 bg-white/80 text-slate-400 rounded-2xl border border-slate-200 cursor-not-allowed font-semibold transform ${
                      clickedButton === "prev-page"
                        ? "scale-95 bg-slate-100 shadow-lg"
                        : ""
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleButtonClick("current-page")}
                    className={`px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-2xl font-bold shadow-lg transform ${
                      clickedButton === "current-page"
                        ? "scale-95 from-cyan-700 to-blue-800 shadow-lg"
                        : "hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl hover:scale-105"
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleButtonClick("next-page")}
                    className={`px-6 py-3 bg-white/80 text-slate-400 rounded-2xl border border-slate-200 cursor-not-allowed font-semibold transform ${
                      clickedButton === "next-page"
                        ? "scale-95 bg-slate-100 shadow-lg"
                        : ""
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
