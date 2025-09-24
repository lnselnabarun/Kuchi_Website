"use client";
import React from "react";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Calendar as CalendarIcon,
} from "lucide-react";

const DashboardStatus = () => {
  const todayStats = [
    {
      label: "Orders",
      value: "24",
      change: "+12%",
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
      icon: ShoppingCart,
    },
    {
      label: "Revenue",
      value: "₹45,230",
      change: "+8%",
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      icon: TrendingUp,
    },
    {
      label: "Products",
      value: "1,247",
      change: "+3%",
      color: "text-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      icon: Package,
    },
    {
      label: "Users",
      value: "856",
      change: "+15%",
      color: "text-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <main className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mr-3">
                  <Activity size={20} className="text-white" />
                </div>
                Today's Performance
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {todayStats.map((stat, index) => {
                  const StatIcon = stat?.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${stat?.bgColor} rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:scale-105 group border border-white/50  flex flex-col items-center justify-center`}
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className={`p-2 rounded-lg bg-white/80 ${stat?.iconColor}`}
                        >
                          <StatIcon size={30} />
                        </div>
                      </div>

                      {/* Texts */}
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          {stat?.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat?.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardStatus;
