import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import EditEvent from "./EditEvent";

const AllEventList = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalEvents, setTotalEvents] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");
      const token = localStorage.getItem("access_token");

      const response = await axios.get("http://192.168.0.182:8000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (data.success && data.data) {
        setEvents(data.data);
        setTotalEvents(data.total || data.data.length);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      if (err.response) {
        // Axios provides response details
        if (err.response.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (err.response.status === 403) {
          setError("You don't have permission to view events.");
        } else {
          setError(`Failed to fetch events (Status: ${err.response.status})`);
        }
      } else {
        setError(err.message || "Failed to load events. Please try again.");
      }

      if (!showRefreshLoader) setEvents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const handleRefresh = () => {
    fetchEvents(true);
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.event_id === eventId);
    setSelectedEvent(eventToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedEvent(null);
    fetchEvents(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      await axios.delete(`http://192.168.0.182:8000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.event_id !== eventId)
      );
      setTotalEvents((prev) => prev - 1);
    } catch (err) {
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleAddNew = () => {
    setCurrentView("add");
  };

  if (currentView === "edit") {
    return (
      <EditEvent
        onBack={handleBackToList}
        eventId={selectedEvent?.event_id}
        // eventData={selectedEvent}
      />
    );
  }

  if (currentView === "add") {
    return (
      <div className="p-6">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
        >
          Back to List
        </button>
        <h2>Add New Event Component Goes Here</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header with stats and refresh */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Events Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Total Events: {totalEvents}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Error</div>
                <div className="text-sm">{error}</div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-12">
              <div className="flex flex-col items-center justify-center">
                <Loader2
                  size={40}
                  className="animate-spin text-blue-600 mb-4"
                />
                <p className="text-gray-600">Loading events...</p>
              </div>
            </div>
          ) : events.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-12">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Events Found
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first event
                </p>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add New Event
                </button>
              </div>
            </div>
          ) : (
            // Content Card with Events
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">Event Title</div>
                  <div className="col-span-2">Venue</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-center">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {events.map((event, index) => (
                  <div
                    key={event.event_id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </span>
                      </div>

                      <div className="col-span-3">
                        <div>
                          <p
                            className="text-sm font-medium text-gray-900 line-clamp-2"
                            title={event.title}
                          >
                            {event.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {event.description?.substring(0, 50)}...
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <p
                          className="text-sm text-gray-900 line-clamp-2"
                          title={event.venue}
                        >
                          {event.venue}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p
                          className="text-sm text-gray-600 line-clamp-2"
                          title={event.event_location}
                        >
                          {event.event_location}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <div className="text-xs space-y-1">
                          <div className="text-gray-600">
                            <span className="font-medium">Start:</span>{" "}
                            {formatDateTime(event.start_time)}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">End:</span>{" "}
                            {formatDateTime(event.end_time)}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="col-span-1">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => handleEdit(event.event_id)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded transition-colors"
                            title="Edit Event"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(event.event_id)}
                            className="inline-flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 size={14} />
                          </button>
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
    </div>
  );
};

export default AllEventList;