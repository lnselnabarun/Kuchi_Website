import React, { useState } from "react";
import { Save, User } from "lucide-react";

const AddNewUser = ({ onBack }) => {
  const [userData, setUserData] = useState({
    username: "",
    emailId: "",
    password: "",
    otherDetails: "",
    userGroup: "",
    status: "Active",
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("User data:", userData);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Form Content */}
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
                    value={userData.username}
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
                    value={userData.emailId}
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
                    value={userData.password}
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
                    value={userData.otherDetails}
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
                    value={userData.userGroup}
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
                        checked={userData.status === "Active"}
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
                        checked={userData.status === "Inactive"}
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

                {/* Add User Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={20} />
                  <span>Add User</span>
                </button>
              </div>

              {/* Right Column - Preview or Additional Content */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">User Preview</p>
                  <p className="text-sm">User information will appear here</p>
                  {userData.username && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-left">
                      <p className="text-sm">
                        <strong>Username:</strong> {userData.username}
                      </p>
                      {userData.emailId && (
                        <p className="text-sm">
                          <strong>Email:</strong> {userData.emailId}
                        </p>
                      )}
                      {userData.userGroup && (
                        <p className="text-sm">
                          <strong>Group:</strong> {userData.userGroup}
                        </p>
                      )}
                      <p className="text-sm">
                        <strong>Status:</strong> {userData.status}
                      </p>
                    </div>
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

export default AddNewUser;
