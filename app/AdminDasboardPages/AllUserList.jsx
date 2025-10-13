import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Loader2, AlertCircle } from "lucide-react";
import EditUser from "./EditUser";

const AllUserList = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales persons from API
  useEffect(() => {
    fetchSalesPersons();
  }, []);

  const fetchSalesPersons = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch(
        "http://192.168.0.182:8000/api/admin/sales?role=sales",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Map API response to component state format
        const mappedUsers = result.data.map((user) => ({
          id: user.id,
          username: user.name,
          email: user.email,
          status: user.isActive ? "Active" : "Inactive",
          role: user.role,
          emailVerified: user.email_verified_at ? true : false,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        }));

        setUsers(mappedUsers);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user?.id === id);
    setSelectedUser(userToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleDelete = (id) => {};

  const handleAddNew = () => {};

  // If we're in edit mode, show the EditUser component
  if (currentView === "edit") {
    return (
      <EditUser
        onBack={handleBackToList}
        userId={selectedUser?.id}
        userData={selectedUser}
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-600">Loading sales persons...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-white rounded-xl shadow-lg border border-red-200/50 p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Error Loading Data
                  </h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchSalesPersons}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Sales Persons ({users.length})
                  </h2>
                  <button
                    onClick={fetchSalesPersons}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Refresh
                  </button>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-4">Email</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-center">Action</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No sales persons found</p>
                  </div>
                ) : (
                  users.map((user, index) => (
                    <div
                      key={user?.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Serial Number */}
                        <div className="col-span-1 text-center">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </div>

                        {/* Username */}
                        <div className="col-span-3">
                          <div className="max-w-xs">
                            <p
                              className="text-sm font-medium text-gray-900 truncate"
                              title={user?.username}
                            >
                              {user?.username}
                            </p>
                            {user?.emailVerified && (
                              <p className="text-xs text-green-600">
                                ✓ Verified
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="col-span-4">
                          <div className="max-w-xs">
                            <p
                              className="text-sm text-gray-900 truncate"
                              title={user?.email}
                            >
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              user?.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user?.status}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(user?.id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(user?.id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                              title="Delete User"
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

export default AllUserList;
