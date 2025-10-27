import React, { useState } from "react";
import { Save, User, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

const AddNewUser = ({ onBack }) => {
  const [userData, setUserData] = useState({
    username: "",
    emailId: "",
    password: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear messages when user starts typing
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!userData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!userData.emailId.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.emailId)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!userData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (userData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare the request body according to API requirements
      const requestBody = {
        name: userData.username,
        email: userData.emailId,
        password: userData.password,
        role: "sales",
      };

      // Make the API call
      const response = await axios.post(
        "http://192.168.0.182:8000/api/auth/register",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response?.data, "response");
      if (response?.data?.message == "User registered successfully") {
        // Handle success
        setSuccess("User registered successfully!");
        console.log("Registration successful:", response.data);

        // Reset form after successful registration
        setTimeout(() => {
          setUserData({
            username: "",
            emailId: "",
            password: "",
            status: "Active",
          });
          setSuccess("");
          // If you want to navigate back after successful registration
          onBack && onBack();
        }, 2000);

      }
    } catch (err) {
      // Handle error
      console.error("Registration error:", err);

      if (err.response) {
        // Server responded with an error
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError(
            `Registration failed: ${err.response.status} ${err.response.statusText}`
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
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
                    value={userData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
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
                    value={userData.emailId}
                    onChange={(e) =>
                      handleInputChange("emailId", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter email address"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter password (min. 6 characters)"
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
                        checked={userData.status === "Active"}
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
                        checked={userData.status === "Inactive"}
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

                {/* Add User Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    loading
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
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Add User</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column - Preview or Additional Content */}
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">User Preview</p>
                  <p className="text-sm">User information will appear here</p>
                  {userData.username && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-left space-y-2">
                      <p className="text-sm">
                        <strong>Username:</strong> {userData.username}
                      </p>
                      {userData.emailId && (
                        <p className="text-sm">
                          <strong>Email:</strong> {userData.emailId}
                        </p>
                      )}
                      <p className="text-sm">
                        <strong>Role:</strong> Sales
                      </p>
                      <p className="text-sm">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            userData.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {userData.status}
                        </span>
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
