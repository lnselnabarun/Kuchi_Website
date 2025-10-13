"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Anchor,
  DollarSign,
  User,
  Plus,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_BASE_URL = "http://192.168.0.182:8000/api";

export default function YachtBookingApp() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    yacht_name: "",
    start_date: "",
    end_date: "",
    price: "",
  });

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // GET /api/bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`);
      const result = await response.json();

      if (result.success) {
        setBookings(result.data);
      } else {
        showNotification("error", "Failed to fetch bookings");
      }
    } catch (error) {
      showNotification("error", "Error connecting to server: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // POST /api/bookings
  const createBooking = async (bookingData) => {
    // Client-side validation
    if (new Date(bookingData.end_date) <= new Date(bookingData.start_date)) {
      throw new Error("End date must be after start date");
    }

    // Create FormData
    const formData = new FormData();
    formData.append("customer_name", bookingData.customer_name);
    formData.append("yacht_name", bookingData.yacht_name);
    formData.append("start_date", bookingData.start_date);
    formData.append("end_date", bookingData.end_date);
    formData.append("price", bookingData.price);

    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.customer_name ||
      !formData.yacht_name ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.price
    ) {
      showNotification("error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await createBooking(formData);

      showNotification("success", "Booking created successfully!");
      setFormData({
        customer_name: "",
        yacht_name: "",
        start_date: "",
        end_date: "",
        price: "",
      });

      setShowForm(false);

      // Refresh bookings list
      await fetchBookings();
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDays = (start, end) => {
    const diffTime = new Date(end) - new Date(start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                <Anchor className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Yacht Bookings
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage your luxury yacht reservations
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchBookings}
                disabled={loading}
                className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl shadow-lg flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <p
              className={
                notification.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {notification.message}
            </p>
          </div>
        )}

        {/* Booking Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create New Booking
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                      placeholder="Enter customer name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Yacht Name *
                  </label>
                  <div className="relative">
                    <Anchor className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="yacht_name"
                      value={formData.yacht_name}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                      placeholder="Enter yacht name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      disabled={submitting}
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Booking"
                  )}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">All Bookings</h2>
            <p className="text-blue-100 text-sm mt-1">
              Total: {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-500">
                Create your first booking to get started!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Yacht
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                            {booking.customer_name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {booking.customer_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Anchor className="w-4 h-4 text-cyan-600" />
                          <span className="text-gray-700">
                            {booking.yacht_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm">
                          <div className="text-gray-700">
                            {formatDate(booking.start_date)}
                          </div>
                          <div className="text-gray-500">
                            to {formatDate(booking.end_date)}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {calculateDays(booking.start_date, booking.end_date)}{" "}
                          days
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-lg font-bold text-gray-800">
                          ${parseFloat(booking.price).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
