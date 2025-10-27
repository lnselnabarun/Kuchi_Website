import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Save, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

const EditUser = ({ onBack, userId, userData }) => {
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    otherDetails: "",
    userGroup: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize form with existing user data
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || userData.name || "",
        emailId: userData.email || userData.emailId || "",
        password: "", // Keep password empty for security
        otherDetails: userData.otherDetails || "",
        userGroup: userData.userGroup || userData.role || "",
        status: userData.status || "Active",
      });
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear messages when user starts typing
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.emailId.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      setError("Please enter a valid email address");
      return false;
    }
    // Password is optional for update
    if (formData.password && formData.password.length < 6) {
      setError("Password must be at least 6 characters long if provided");
      return false;
    }
    return true;
  };

  const getAuthToken = () => {
    // Get auth token from localStorage
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.warn("No auth token found in localStorage");
    }
    return token;
  };

  const handleUpdateUser = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check if userId is available
    if (!userId) {
      setError("User ID is missing. Cannot update user.");
      return;
    }

    setLoading(true);

    try {
      // Get auth token
      const token = getAuthToken();

      // Prepare the request body
      const requestBody = {
        username: formData.username,
        emailId: formData.emailId,
      };

      // Only include password if it's been changed
      if (formData.password.trim()) {
        requestBody.password = formData.password;
      }

      // Prepare headers
      const headers = {
        "Content-Type": "application/json",
      };

      // Add auth token if available
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Make the API call
      const response = await axios.put(
        `http://192.168.0.182:8000/api/admin/sales/${userId}/status`,
        requestBody,
        { headers }
      );

      // Handle success
      setSuccess("User updated successfully!");
      console.log("Update successful:", response.data);

      // Clear password field after successful update
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      // Optional: Call onBack after a delay
      setTimeout(() => {
        setSuccess("");
        // Uncomment if you want to navigate back after successful update
        // onBack && onBack();
      }, 2000);
    } catch (err) {
      // Handle error
      console.error("Update error:", err);

      if (err.response) {
        // Server responded with an error
        if (err.response.status === 401) {
          setError("Unauthorized. Please login again.");
          // Optional: Redirect to login
          // window.location.href = '/login';
        } else if (err.response.status === 404) {
          setError("User not found.");
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError(
            `Update failed: ${err.response.status} ${err.response.statusText}`
          );
        }
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "No response from server. Please check your connection and try again."
        );
      } else {
        // Something else happened
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleUpdateUser();
  //   }
  // };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
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
          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
              <CheckCircle className="text-green-500 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Success</p>
                <p className="text-sm text-green-600">{success}</p>
              </div>
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    // onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter username"
                    disabled={loading}
                  />
                </div>

                {/* Email Id */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={(e) =>
                      handleInputChange("emailId", e.target.value)
                    }
                    // onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter email address"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                    <span className="text-gray-500 text-xs ml-2">
                      (Leave blank to keep current)
                    </span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    // onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter new password (optional)"
                    disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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
                    disabled={loading || !userId}
                    className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      loading || !userId
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Update User</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column - User Preview */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center text-gray-500 w-full">
                  <User size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">User Information</p>

                  {formData.username ? (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-left space-y-3">
                      <div className="text-sm">
                        <strong className="text-gray-700">Username:</strong>
                        <span className="ml-2 text-gray-900">
                          {formData.username}
                        </span>
                      </div>

                      {formData.emailId && (
                        <div className="text-sm">
                          <strong className="text-gray-700">Email:</strong>
                          <span className="ml-2 text-gray-900 break-all">
                            {formData.emailId}
                          </span>
                        </div>
                      )}

                      {formData.userGroup && (
                        <div className="text-sm">
                          <strong className="text-gray-700">Role:</strong>
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

                      {formData.password && (
                        <div className="text-sm pt-2 border-t border-gray-200">
                          <span className="text-amber-600 text-xs">
                            ⚠️ Password will be updated
                          </span>
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
