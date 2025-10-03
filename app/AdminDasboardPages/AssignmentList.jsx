import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Package,
  Calendar,
  Clock,
} from "lucide-react";
import EditAssignment from "./EditAssignment";

const AssignmentList = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set([1, 2])); 
  const [productSearchTerms, setProductSearchTerms] = useState({});
  const [currentView, setCurrentView] = useState("list"); // "list" or "edit"
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletingAssignmentId, setDeletingAssignmentId] = useState(null);

  const assignments = [
    {
      id: 1,
      groupTitle: "earring",
      userList: [
        {
          user: "",
          startTime: "2020-06-09 05:00:00",
          endTime: "2020-06-10 06:00:00",
          accessLimit: 7,
        },
        {
          user: "",
          startTime: "2020-06-09 08:00:00",
          endTime: "2020-06-12 09:00:00",
          accessLimit: 8,
        },
      ],
      products: [
        {
          id: 1,
          image: "/api/placeholder/80/80",
          lotNo: "SW9K0004",
          title: "GOLD SWAROVSKI BALI",
          designNo: "0000",
          weight: {
            gross: "22.000",
            stone: "4.280",
            other: "0.000",
            net: "17.720",
            pure: "6.834",
            pcs: "1",
            qty: "2",
          },
        },
      ],
    },
    {
      id: 2,
      groupTitle: "INVISIBLE COLLECTION",
      userList: [
        {
          user: "",
          startTime: "0000-00-00 00:00:00",
          endTime: "0000-00-00 00:00:00",
          accessLimit: 0,
        },
        {
          user: "santa",
          startTime: "0000-00-00 00:00:00",
          endTime: "0000-00-00 00:00:00",
          accessLimit: 0,
        },
      ],
      products: [
        {
          id: 1,
          image: "/api/placeholder/80/80",
          lotNo: "SW9K0119",
          title: "GOLD SWAROVSKI EAR-RINGS",
          designNo: "0000",
          weight: {
            gross: "17.2",
            stone: "10.8",
            other: "0.00",
            net: "6.380",
            pure: "2.461",
            pcs: "1",
            qty: "2",
          },
        },
        {
          id: 2,
          image: "/api/placeholder/80/80",
          lotNo: "SW9K0108",
          title: "GOLD SWAROVSKI EAR-RINGS",
          designNo: "0000",
          weight: {
            gross: "28.9",
            stone: "16.0",
            other: "0.00",
            net: "12.900",
            pure: "4.973",
            pcs: "1",
            qty: "2",
          },
        },
      ],
    },
  ];

  const handleEdit = (assignmentId) => {
    const assignmentToEdit = assignments.find(assignment => assignment.id === assignmentId);
    setSelectedAssignment(assignmentToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedAssignment(null);
  };

  const handleDelete = (assignmentId) => {
    setDeletingAssignmentId(assignmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting assignment:", deletingAssignmentId);
    // Add your actual delete logic here
    setShowDeleteModal(false);
    setDeletingAssignmentId(null);
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingAssignmentId(null);
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleProductSearch = (assignmentId, value) => {
    setProductSearchTerms((prev) => ({
      ...prev,
      [assignmentId]: value,
    }));
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment?.groupTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredProducts = (assignmentId, products) => {
    const searchTerm = productSearchTerms[assignmentId] || "";
    if (!searchTerm) return products;

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.lotNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // If we're in edit mode, show the EditAssignment component
  if (currentView === "edit") {
    return (
      <EditAssignment 
        onBack={handleBackToList}
        assignmentId={selectedAssignment?.id}
        assignmentData={selectedAssignment}
      />
    );
  }
  const DeleteModalDark = () => {
    const assignmentToDelete = assignments.find(a => a.id === deletingAssignmentId);
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-md w-full transform animate-in zoom-in duration-200">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-red-500/90 to-pink-500/90 backdrop-blur-xl px-8 py-6 text-white rounded-t-3xl border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Delete Assignment</h3>
                <p className="text-red-100 opacity-90">This action cannot be undone</p>
              </div>
            </div>
          </div>
  
          {/* Modal Content */}
          <div className="px-8 py-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Are you sure you want to delete this assignment?
              </h4>
              <p className="text-white/70 mb-4">
                You are about to delete the assignment:
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold">
                    #{assignmentToDelete?.id}
                  </div>
                  <div>
                    <h5 className="font-bold text-white capitalize">
                      {assignmentToDelete?.groupTitle}
                    </h5>
                    <p className="text-white/70 text-sm">
                      {assignmentToDelete?.products?.length} products • {assignmentToDelete?.userList?.length} users
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-red-400 font-medium text-sm">
                This will permanently remove all associated products and user access.
              </p>
            </div>
          </div>
  
          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-4 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-b-3xl border-t border-white/10">
            <button
              onClick={cancelDelete}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-medium text-white transition-all backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = () => {
    const assignmentToDelete = assignments.find(a => a.id === deletingAssignmentId);
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-in zoom-in duration-200">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6 text-white rounded-t-3xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Delete Assignment</h3>
                <p className="text-red-100 opacity-90">This action cannot be undone</p>
              </div>
            </div>
          </div>
  
          {/* Modal Content */}
          <div className="px-8 py-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Are you sure you want to delete this assignment?
              </h4>
              <p className="text-gray-600 mb-4">
                You are about to delete the assignment:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                    #{assignmentToDelete?.id}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 capitalize">
                      {assignmentToDelete?.groupTitle}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {assignmentToDelete?.products?.length} products • {assignmentToDelete?.userList?.length} users
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-red-600 font-medium text-sm">
                This will permanently remove all associated products and user access.
              </p>
            </div>
          </div>
  
          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-4 px-8 py-6 bg-gray-50 rounded-b-3xl">
            <button
              onClick={cancelDelete}
              className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl font-medium text-gray-700 transition-all hover:shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-25 via-slate-50 to-gray-50">
      {/* Main Content */}
      {showDeleteModal && <DeleteModal />}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-full mx-auto space-y-6">
          {/* Assignment Cards */}
          <div className="space-y-6">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment?.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-8 py-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <span className="font-bold text-lg">
                          #{assignment?.id}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold capitalize">
                          {assignment?.groupTitle}
                        </h3>
                        <p className="text-blue-100 mt-1">
                          {assignment?.products.length} products •{" "}
                          {assignment?.userList.length} users
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleRowExpansion(assignment?.id)}
                        className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl transition-all font-medium"
                      >
                        <span>
                          {expandedRows.has(assignment?.id)
                            ? "Hide Details"
                            : "Show Details"}
                        </span>
                        {expandedRows.has(assignment?.id) ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                      <button 
                        onClick={() => handleEdit(assignment?.id)}
                        className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(assignment?.id)}
                        className="p-3 bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  {/* User List Section */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="text-blue-600" size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        User Access
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assignment?.userList.map((userInfo, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {userInfo?.user
                                  ? userInfo?.user.charAt(0).toUpperCase()
                                  : "U"}
                              </div>
                              <span className="font-medium text-gray-800">
                                {userInfo?.user || "Unassigned User"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar size={14} />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Start
                                  </div>
                                  <div className="font-medium">
                                    {userInfo?.startTime?.split(" ")[0]}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Clock size={14} />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Access Limit
                                  </div>
                                  <div className="font-medium">
                                    {userInfo?.accessLimit}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Product Details */}
                  {expandedRows.has(assignment?.id) && (
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Package className="text-blue-600" size={20} />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            Product Details
                          </h4>
                        </div>
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="text"
                            value={productSearchTerms[assignment?.id] || ""}
                            onChange={(e) =>
                              handleProductSearch(
                                assignment?.id,
                                e.target.value
                              )
                            }
                            className="pl-9 pr-4 py-2 w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm"
                            placeholder="Search products..."
                          />
                        </div>
                      </div>

                      {/* Product Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {getFilteredProducts(
                          assignment?.id,
                          assignment?.products
                        ).map((product) => (
                          <div
                            key={product?.id}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-all duration-200"
                          >
                            <div className="flex items-start space-x-4">
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-sm">
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

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-900 mb-1">
                                    {product?.title}
                                  </h5>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium">
                                      {product?.lotNo}
                                    </span>
                                    <span>Design: {product?.designNo}</span>
                                  </div>
                                </div>

                                {/* Weight Details Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                  {Object.entries(product.weight).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="bg-white rounded-lg p-3 border border-gray-100"
                                      >
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                          {key}
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                          {value}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentList;