import React, { useState } from "react";
import { ArrowLeft, Edit, Trash2, Eye, Plus } from "lucide-react";
import EditUser from "./EditUser";

const AllUserList = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list"); // "list" or "edit"
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [users] = useState([
    {
      id: 1,
      username: "santa",
      email: "santa@lnsel.net",
      status: "Active",
      password: "password123",
      otherDetails: "Administrator user with full permissions",
      userGroup: "Admin"
    },
    {
      id: 2,
      username: "Lalit Kulthia",
      email: "lkulthia@cal2.vsnl.net.in",
      status: "Active",
      password: "password123",
      otherDetails: "Manager user with limited permissions",
      userGroup: "Manager"
    },
    {
      id: 3,
      username: "Swarnaleka shetty",
      email: "swarna1224@gmail.com",
      status: "Active",
      password: "password123",
      otherDetails: "Regular user account",
      userGroup: "User"
    },
    {
      id: 4,
      username: "Lalit Kulthia",
      email: "lkulthia@gmail.com",
      status: "Active",
      password: "password123",
      otherDetails: "Secondary account for Lalit",
      userGroup: "User"
    },
    {
      id: 5,
      username: "Mahesh",
      email: "mahesh@lnsel.com",
      status: "Active",
      password: "password123",
      otherDetails: "Technical support user",
      userGroup: "Support"
    },
    {
      id: 6,
      username: "Prasant",
      email: "suraj.lnsel@gmail.com",
      status: "Active",
      password: "password123",
      otherDetails: "Sales representative account",
      userGroup: "Sales"
    }
  ]);

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user?.id === id);
    setSelectedUser(userToEdit);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
    // Add delete logic here
  };

  const handleView = (id) => {
    console.log("View user:", id);
    // Add view logic here
  };

  const handleAddNew = () => {
    console.log("Add new user");
    // You can handle this by calling a prop function or navigating
  };

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

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-3">Username</div>
                <div className="col-span-4">Email</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-center">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <div key={user?.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Serial Number */}
                    <div className="col-span-1 text-center">
                      <span className="text-sm font-medium text-gray-900">{user?.id}</span>
                    </div>

                    {/* Username */}
                    <div className="col-span-3">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 truncate" title={user?.username}>
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500">User #{user?.id}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={user?.email}>
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
              ))}
            </div>
          </div>

          {/* Add User Button (Floating Action Button) */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            title="Add New User"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUserList;