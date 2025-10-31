"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Upload,
  Package,
  Users,
  FolderOpen,
  ShoppingCart,
  Calendar,
  Image,
  Settings,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  LogOut,
  FileText,
} from "lucide-react";
import ManageOrder from "../AdminDasboardPages/ManageOrder";
import DashboardStatus from "../AdminDasboardPages/DashboardStatus";
import AccountSettings from "../AdminDasboardPages/AccountSettings";
import CurrencyConverter from "../AdminDasboardPages/CurrencyConverter";
import CropProductImage from "../AdminDasboardPages/CropProductImage";
import ContentManagement from "../AdminDasboardPages/ContentManagement";
// import ContentEditor from "../AdminDasboardPages/ContentEditor";
import ContentEditorNew from '../AdminDasboardPages/ContentEditorNew';
import AddNewBanner from "../AdminDasboardPages/AddNewBanner";
import AllBannerList from "../AdminDasboardPages/AllBannerList";
import EditBanner from "../AdminDasboardPages/EditBanner";
import AddNewEvent from "../AdminDasboardPages/AddNewEvent";
import AllEventList from "../AdminDasboardPages/AllEventList";
import EditEvent from "../AdminDasboardPages/EditEvent";
import AddNewUser from "../AdminDasboardPages/AddNewUser";
import AllUserList from "../AdminDasboardPages/AllUserList";
import EditUser from "../AdminDasboardPages/EditUser";
import AssignmentList from "../AdminDasboardPages/AssignmentList";
import AddAssignment from "../AdminDasboardPages/AddAssignment";
import ImportExportMaster from "../AdminDasboardPages/ImportExportMaster";
import ImportExportProduct from "../AdminDasboardPages/ImportExportProduct";
import MetalRateSetting from "../AdminDasboardPages/MetalRateSetting";
import AddProduct from "../AdminDasboardPages/AddProduct";
import AdminLoginModal from "../AdminDasboardPages/AdminLoginModal";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Track current page and navigation history
  const [currentPage, setCurrentPage] = useState({
    type: "main",
    mainItem: null,
    subItem: null,
    component: null,
    contentType: null, // Added for content editor
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('User_role');
    setIsAuthenticated(token && role === 'admin');
  }, []);

  // Logout function
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const token = localStorage.getItem('access_token');
      
      // Call logout API
      const response = await fetch('http://192.168.0.182:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      localStorage.clear();
      setShowModal(false);
      setIsAuthenticated(false);
      
      // Reset to default state
      setActiveTab("dashboard");
      setCurrentPage({
        type: "main",
        mainItem: null,
        subItem: null,
        component: null,
        contentType: null,
      });
      
    } catch (error) {
      localStorage.clear();
      setShowModal(false);
      setIsAuthenticated(false);
      
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "import-export",
      label: "Import/Export",
      icon: Upload,
      description: "Data Management",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "manage-product",
      label: "Manage Product",
      icon: Package,
      description: "Product Catalog",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "manage-user",
      label: "Manage User",
      icon: Users,
      description: "User Management",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "manage-collection",
      label: "Manage Collection",
      icon: FolderOpen,
      description: "Product Collections",
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "manage-order",
      label: "Manage Order",
      icon: ShoppingCart,
      description: "Order Processing",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: "manage-event",
      label: "Manage Event",
      icon: Calendar,
      description: "Events & Promotions",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "manage-banner",
      label: "Manage Banner",
      icon: Image,
      description: "Website Banners",
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "System Configuration",
      color: "from-gray-500 to-slate-600",
    },
  ];

  const handleMenuClick = (itemId) => {
    const itemsWithModals = [
      "import-export",
      "manage-product",
      "manage-user",
      "manage-collection",
      "manage-event",
      "manage-banner",
      "settings",
    ];

    if (itemsWithModals.includes(itemId)) {
      setModalType(itemId);
      setShowModal(true);
    } else {
      setActiveTab(itemId);
      setCurrentPage({
        type: "main",
        mainItem: itemId,
        subItem: null,
        component: null,
        contentType: null,
      });
    }

    setIsMobileMenuOpen(false);
  };

  const handleSubItemClick = (mainItemId, subItemLabel) => {
    setShowModal(false);
    setCurrentPage({
      type: "subpage",
      mainItem: mainItemId,
      subItem: subItemLabel,
      component: getComponentForSubItem(mainItemId, subItemLabel),
      contentType: null,
    });
    setActiveTab(mainItemId);
  };

  // Handle navigation from Content Management to Content Editor
  const handleContentNavigation = (contentType) => {
    setCurrentPage({
      type: "content-editor",
      mainItem: "settings",
      subItem: "Content Management",
      component: "ContentEditor",
      contentType: contentType,
    });
  };

  // Handle back navigation from Content Editor to Content Management
  const handleBackToContentManagement = () => {
    setCurrentPage({
      type: "subpage",
      mainItem: "settings",
      subItem: "Content Management",
      component: "ContentManagement",
      contentType: null,
    });
  };

  const getComponentForSubItem = (mainItemId, subItemLabel) => {
    const componentMap = {
      settings: {
        "Account Settings": "AccountSettings",
        "Currency Converter": "CurrencyConverter",
        "Crop Product Image": "CropProductImage",
        "Content Management": "ContentManagement",
      },
      "manage-product": {
        "Add Product": "AddProducts",
        "Product List": "ProductList",
        "Bulk Editing": "BulkEditing",
        "Metal Rate Setting": "MetalRateSetting",
        "Set Variable Price": "SetVariablePrice",
      },
      "import-export": {
        Master: "ImportExportMaster",
        Product: "ImportExportProduct",
      },
      "manage-collection": {
        "Add Assignment": "AddAssignment",
        "Assignment List": "AssignmentList",
      },
      "manage-user": {
        "Add New User": "AddNewUser",
        "All User List": "AllUserList",
        "Edit User": "EditUser",
      },
      "manage-event": {
        "Add New Event": "AddNewEvent",
        "All Event List": "AllEventList",
        "Edit Event": "EditEvent",
      },
      "manage-banner": {
        "Add New Banner": "AddNewBanner",
        "All Banner List": "AllBannerList",
        "Edit Banner": "EditBanner",
      },
    };

    return componentMap[mainItemId]?.[subItemLabel] || null;
  };

  const handleBackToMain = () => {
    setCurrentPage({
      type: "main",
      mainItem: null,
      subItem: null,
      component: null,
      contentType: null,
    });
    setActiveTab("dashboard");
  };

  const renderMainContent = () => {
    // Handle Content Editor page
    if (currentPage.type === "content-editor") {
      return (
        <ContentEditorNew 
          contentType={currentPage.contentType}
          onBack={handleBackToContentManagement}
        />
      );
    }

    if (currentPage.type === "subpage") {
      switch (currentPage.component) {
        case "AccountSettings":
          return <AccountSettings onBack={handleBackToMain} />;
        case "CurrencyConverter":
          return <CurrencyConverter onBack={handleBackToMain} />;
        case "CropProductImage":
          return <CropProductImage onBack={handleBackToMain} />;
        case "ContentManagement":
          return (
            <ContentManagement 
              onBack={handleBackToMain}
              onNavigate={handleContentNavigation}
            />
          );
        case "MetalRateSetting":
          return <MetalRateSetting onBack={handleBackToMain} />;
        case "AddProducts":
          return <AddProduct onBack={handleBackToMain} />;
        case "AddNewBanner":
          return <AddNewBanner onBack={handleBackToMain} />;
        case "AllBannerList":
          return <AllBannerList onBack={handleBackToMain} />;
        case "EditBanner":
          return <EditBanner onBack={handleBackToMain} />;
        case "AddNewEvent":
          return <AddNewEvent onBack={handleBackToMain} />;
        case "AllEventList":
          return <AllEventList onBack={handleBackToMain} />;
        case "EditEvent":
          return <EditEvent onBack={handleBackToMain} />;
        case "AddNewUser":
          return <AddNewUser onBack={handleBackToMain} />;
        case "AllUserList":
          return <AllUserList onBack={handleBackToMain} />;
        case "EditUser":
          return <EditUser onBack={handleBackToMain} />;
        case "AssignmentList":
          return <AssignmentList onBack={handleBackToMain} />;
        case "AddAssignment":
          return <AddAssignment onBack={handleBackToMain} />;
        case "ImportExportMaster":
          return <ImportExportMaster onBack={handleBackToMain} />;
        case "ImportExportProduct":
          return <ImportExportProduct onBack={handleBackToMain} />;
      }
    }

    switch (activeTab) {
      case "dashboard":
        return <DashboardStatus />;
      case "manage-order":
        return <ManageOrder />;
      case "manage-product":
      case "manage-user":
      case "manage-collection":
      case "manage-event":
      case "manage-banner":
      case "settings":
      case "import-export":
        return <DashboardStatus />;
      default:
        return <DashboardStatus />;
    }
  };

  const handleProfileClick = () => {
    setModalType("profile");
    setShowModal(true);
    setIsProfileDropdownOpen(false);
  };

  const getModalOptions = () => {
    switch (modalType) {
      case "profile":
        return [
          { label: "Account Settings", icon: Settings },
          { label: "Billing", icon: Package },
          { label: "Sign out", icon: LogOut },
        ];
      case "import-export":
        return [
          { label: "Master", icon: Upload },
          { label: "Product", icon: Package },
        ];
      case "manage-product":
        return [
          { label: "Add Product", icon: Package },
          { label: "Product List", icon: FolderOpen },
          { label: "Bulk Editing", icon: Settings },
          { label: "Metal Rate Setting", icon: Calendar },
          { label: "Set Variable Price", icon: ShoppingCart },
        ];
      case "manage-collection":
        return [
          { label: "Add Assignment", icon: FolderOpen },
          { label: "Assignment List", icon: Users },
        ];
      case "manage-user":
        return [
          { label: "Add New User", icon: Users },
          { label: "All User List", icon: FolderOpen },
        ];
      case "manage-event":
        return [
          { label: "Add New Event", icon: Calendar },
          { label: "All Event List", icon: FolderOpen },
        ];
      case "manage-banner":
        return [
          { label: "Add New Banner", icon: Image },
          { label: "All Banner List", icon: FolderOpen },
        ];
      case "settings":
        return [
          { label: "Currency Converter", icon: Settings },
          { label: "Crop Product Image", icon: Image },
          { label: "Account Settings", icon: FolderOpen },
          { label: "Content Management", icon: FileText },
        ];
      default:
        return [];
    }
  };

  if (!isAuthenticated) {
    return <AdminLoginModal onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center flex-shrink-0">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    K
                  </span>
                </div>
                <div className="ml-3 sm:ml-4 hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Kuchi Jewelry
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Control General Admin
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-2 flex-1 justify-center max-w-6xl mx-6">
              {menuItems.map((item) => {
                const Icon = item?.icon;
                const isActive = activeTab === item?.id;
                return (
                  <button
                    key={item?.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`relative px-3 py-3 rounded-xl text-xs font-medium transition-all duration-300 flex flex-col items-center justify-center group min-w-0 flex-1 ${
                      isActive
                        ? "bg-white text-gray-900 shadow-lg shadow-gray-200/50 transform scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item?.color} opacity-10`}
                      />
                    )}
                    <div
                      className={`p-2 rounded-lg mb-1 ${
                        isActive
                          ? `bg-gradient-to-r ${item?.color}`
                          : "bg-gray-100 group-hover:bg-gray-200"
                      } transition-all duration-300`}
                    >
                      <Icon
                        size={14}
                        className={isActive ? "text-white" : "text-gray-600"}
                      />
                    </div>
                    <span className="text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full relative z-10">
                      {item.label.replace(" ", "\n")}
                    </span>
                    {isActive && (
                      <div
                        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${item?.color} rounded-full`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button className="relative p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100/60 rounded-xl transition-all duration-200 hover:scale-105">
              </button>

              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100/60 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                  <User size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <ChevronDown
                  size={14}
                  className="hidden xl:block text-gray-400 sm:w-4 sm:h-4"
                />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100/60 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <Menu size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
            <div className="px-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {menuItems?.map((item) => {
                  const Icon = item?.icon;
                  const isActive = activeTab === item?.id;
                  return (
                    <button
                      key={item?.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`relative p-3 rounded-xl text-xs font-medium transition-all duration-300 flex flex-col items-center justify-center group ${
                        isActive
                          ? "bg-white text-gray-900 shadow-lg shadow-gray-200/50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-md"
                      }`}
                    >
                      {isActive && (
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item?.color} opacity-10`}
                        />
                      )}
                      <div
                        className={`p-2 rounded-lg mb-2 ${
                          isActive
                            ? `bg-gradient-to-r ${item?.color}`
                            : "bg-gray-100 group-hover:bg-gray-200"
                        } transition-all duration-300`}
                      >
                        <Icon
                          size={16}
                          className={isActive ? "text-white" : "text-gray-600"}
                        />
                      </div>
                      <span className="text-center leading-tight relative z-10 text-xs">
                        {item.label}
                      </span>
                      {isActive && (
                        <div
                          className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r ${item?.color} rounded-full`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto border border-gray-200/50">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {modalType === "profile"
                  ? "Profile Options"
                  : menuItems.find((item) => item.id === modalType)?.label ||
                    "Options"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-2">
                {getModalOptions().map((option, index) => {
                  const Icon = option?.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (
                          modalType === "profile" &&
                          option?.label === "Sign out"
                        ) {
                          handleLogout();
                        } else {
                          handleSubItemClick(modalType, option?.label);
                        }
                      }}
                      disabled={isLoggingOut && option?.label === "Sign out"}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                        option?.label === "Sign out"
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      } group ${
                        isLoggingOut && option?.label === "Sign out"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          option?.label === "Sign out"
                            ? "bg-red-100 group-hover:bg-red-200"
                            : "bg-gray-100 group-hover:bg-gray-200"
                        } transition-colors`}
                      >
                        <Icon size={16} />
                      </div>
                      <span>
                        {isLoggingOut && option?.label === "Sign out"
                          ? "Logging out..."
                          : option?.label}
                      </span>
                      {option?.label !== "Sign out" && (
                        <ArrowUpRight
                          size={14}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderMainContent()}
    </div>
  );
};

export default AdminDashboard;