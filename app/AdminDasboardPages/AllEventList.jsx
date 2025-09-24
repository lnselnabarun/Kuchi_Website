import React, { useState } from "react";
import { ArrowLeft, Edit, Trash2, Eye, Plus } from "lucide-react";
import EditEvent from "./EditEvent";

const AllEventList = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list"); // "list" or "edit"
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [events] = useState([
    {
      id: 1,
      title: "TIMES SHAGUN - MUMBAI",
      venue: "JW MARRIOTT - JUHU MUMBAI",
      status: "Active",
      description: "Times Shagun Wedding Exhibition in Mumbai",
      startTime: "2024-03-15T10:00",
      endTime: "2024-03-15T18:00",
    },
    {
      id: 2,
      title: "DESTINATION WEDDING EDIT - DELHI",
      venue: "THE ASHOK - DELHI",
      status: "Active",
      description: "Destination Wedding Planning Exhibition",
      startTime: "2024-03-20T09:00",
      endTime: "2024-03-20T19:00",
    },
    {
      id: 3,
      title: "THE COUTURE WEDDING AFFAIR - HYDERABAD",
      venue: "TAJ KRISHNA - HYDERABAD",
      status: "Active",
      description: "Luxury Couture Wedding Exhibition",
      startTime: "2024-03-25T11:00",
      endTime: "2024-03-25T20:00",
    },
    {
      id: 4,
      title: "JEWELLERY ARABIA 2017 - BAHRAIN",
      venue: "BAHRAIN EXHIBITION & CONVENTION CENTRE",
      status: "Active",
      description: "International Jewelry Exhibition in Bahrain",
      startTime: "2024-04-01T10:00",
      endTime: "2024-04-03T18:00",
    },
    {
      id: 5,
      title: "ARAAISH 2018 - KOLKATA",
      venue: "TAJ BENGAL - KOLKATA",
      status: "Active",
      description: "Traditional Jewelry and Fashion Exhibition",
      startTime: "2024-04-10T10:30",
      endTime: "2024-04-10T19:30",
    },
    {
      id: 6,
      title: "VOD DUBAI INTERNATIONAL JEWELLERY SHOW 2018, UAE",
      venue: "DUBAI WORL TRADE CENTRE, SHAIKH SAEED HALL, INDIA PAVILLION, BOOTH NO J126",
      status: "Active",
      description: "International Jewelry Exhibition in Dubai",
      startTime: "2024-04-15T09:00",
      endTime: "2024-04-17T18:00",
    },
    {
      id: 7,
      title: "JEWELLERY ARABIA 2018, BAHRAIN",
      venue: "BAHRAIN INTERNATIONAL EXHIBITION & CONVENTION CENTRE, INDIA PAVILION, HALL NO. 2, BOOTH NO. 1197",
      status: "Active",
      description: "International Jewelry Exhibition in Bahrain 2018",
      startTime: "2024-04-20T10:00",
      endTime: "2024-04-22T18:00",
    },
  ]);

  const handleEdit = (id) => {
    const eventToEdit = events.find(event => event.id === id);
    setSelectedEvent(eventToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedEvent(null);
  };

  const handleDelete = (id) => {
    console.log("Delete event:", id);
    // Add delete logic here
  };

  const handleView = (id) => {
    console.log("View event:", id);
    // Add view logic here
  };

  const handleAddNew = () => {
    console.log("Add new event");
    // You can handle this by calling a prop function or navigating
  };

  // If we're in edit mode, show the EditEvent component
  if (currentView === "edit") {
    return (
      <EditEvent 
        onBack={handleBackToList}
        eventId={selectedEvent?.id}
        eventData={selectedEvent}
      />
    );
  }

  // Default list view
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">


      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">Event Title</div>
                <div className="col-span-3">Venue</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-center">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {events.map((event, index) => (
                <div key={event?.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Serial Number */}
                    <div className="col-span-1 text-center">
                      <span className="text-sm font-medium text-gray-900">{event?.id}</span>
                    </div>

                    {/* Event Title */}
                    <div className="col-span-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 truncate" title={event?.title}>
                          {event?.title}
                        </p>
                        <p className="text-xs text-gray-500">Event #{event?.id}</p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="col-span-3">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={event?.venue}>
                          {event?.venue}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          event?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event?.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(event?.id)}
                          className="inline-flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                          title="Edit Event"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event?.id)}
                          className="inline-flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Event Button (Floating Action Button) */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            title="Add New Event"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllEventList;