import React, { useState, useEffect } from "react";
import { ArrowLeft, User } from "lucide-react";

const EditUser = ({ onBack, userId, userData }) => {
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    otherDetails: "",
    userGroup: "",
    status: "Active",
  });

  // Initialize form with existing user data
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        emailId: userData.email || "",
        password: userData.password || "",
        otherDetails: userData.otherDetails || "",
        userGroup: userData.userGroup || "",
        status: userData.status || "Active",
      });
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateUser = () => {
    console.log("Updating user:", userId, formData);
    // Handle update user logic here
    // onBack();
  };

  const handleAddNewUser = () => {
    console.log("Adding new user with data:", formData);
    // Handle add new user logic here
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to User List</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter username"
                  />
                </div>

                {/* Email Id */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Id
                  </label>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={(e) =>
                      handleInputChange("emailId", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter password"
                  />
                </div>

                {/* Other Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Details
                  </label>
                  <textarea
                    value={formData.otherDetails}
                    onChange={(e) =>
                      handleInputChange("otherDetails", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Enter other details"
                  />
                </div>

                {/* User Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Group
                  </label>
                  <input
                    type="text"
                    value={formData.userGroup}
                    onChange={(e) =>
                      handleInputChange("userGroup", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter user group"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Status
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === "Inactive"}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleUpdateUser}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Update User
                  </button>
                  <button
                    onClick={handleAddNewUser}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Add New User
                  </button>
                </div>
              </div>

              {/* Right Column - User Preview */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center text-gray-500 w-full">
                  <User size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">User Information</p>

                  {formData.username ? (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-left space-y-2">
                      <div className="text-sm">
                        <strong className="text-gray-700">Username:</strong>
                        <span className="ml-2 text-gray-900">
                          {formData.username}
                        </span>
                      </div>

                      {formData.emailId && (
                        <div className="text-sm">
                          <strong className="text-gray-700">Email:</strong>
                          <span className="ml-2 text-gray-900">
                            {formData.emailId}
                          </span>
                        </div>
                      )}

                      {formData.userGroup && (
                        <div className="text-sm">
                          <strong className="text-gray-700">Group:</strong>
                          <span className="ml-2 text-gray-900">
                            {formData.userGroup}
                          </span>
                        </div>
                      )}

                      <div className="text-sm">
                        <strong className="text-gray-700">Status:</strong>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            formData.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {formData.status}
                        </span>
                      </div>

                      {formData.otherDetails && (
                        <div className="text-sm pt-2 border-t border-gray-200">
                          <strong className="text-gray-700">Details:</strong>
                          <p className="mt-1 text-gray-900 text-xs leading-relaxed">
                            {formData.otherDetails}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm">User information will appear here</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
