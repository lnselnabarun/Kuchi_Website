"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Globe,
  Save,
  Download,
} from "lucide-react";

const CurrencyConverter = ({ onBack }) => {
  const [rates, setRates] = useState({
    INR: 1,
    USD: 0.014,
    THB: 0.44,
    AED: 0.051,
    CNY: 0.098,
    BHD: 0.005,
    SGD: 0.019,
  });

  const [clickedButton, setClickedButton] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("2024-01-15 10:30 AM");

  const handleButtonClick = (buttonId, callback) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(""), 200);
    if (callback) callback();
  };

  const handleRateChange = (currency, value) => {
    setRates((prev) => ({
      ...prev,
      [currency]: parseFloat(value) || 0,
    }));
  };

  const updateFromOnline = async () => {
    handleButtonClick("update-online", () => {
      setIsUpdating(true);
      setTimeout(() => {
        // console.log("Updating rates from online...");
        setLastUpdated(new Date().toLocaleString());
        setIsUpdating(false);
      }, 2000);
    });
  };

  const updateItem = () => {
    handleButtonClick("update-item", () => {
      // console.log("Updating item...");
    });
  };

  const currencyData = [
    {
      code: "INR",
      name: "Indian Rupees",
      flag: "🇮🇳",
      color: "from-orange-500 to-red-600",
      baseRate: true,
    },
    {
      code: "USD",
      name: "US Dollar",
      flag: "🇺🇸",
      color: "from-blue-500 to-indigo-600",
      step: "0.001",
    },
    {
      code: "THB",
      name: "Thai Baht",
      flag: "🇹🇭",
      color: "from-purple-500 to-violet-600",
      step: "0.01",
    },
    {
      code: "AED",
      name: "UAE Dirham",
      flag: "🇦🇪",
      color: "from-emerald-500 to-teal-600",
      step: "0.001",
    },
    {
      code: "CNY",
      name: "Chinese Yuan",
      flag: "🇨🇳",
      color: "from-red-500 to-pink-600",
      step: "0.001",
    },
    {
      code: "BHD",
      name: "Bahrain Dinar",
      flag: "🇧🇭",
      color: "from-amber-500 to-orange-600",
      step: "0.001",
    },
    {
      code: "SGD",
      name: "Singapore Dollar",
      flag: "🇸🇬",
      color: "from-cyan-500 to-blue-600",
      step: "0.001",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            {onBack && (
              <button
                onClick={() => handleButtonClick("back", onBack)}
                className={`p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 rounded-xl transition-all duration-300 transform ${
                  clickedButton === "back"
                    ? "scale-90 bg-slate-100"
                    : "hover:scale-110"
                }`}
              >
                <ArrowLeft size={22} />
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Currency Converter
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Manage global currency exchange rates and conversions
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg">
                  <Globe size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Active Currencies
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    {Object.keys(rates).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Base Currency
                  </p>
                  <p className="text-2xl font-bold text-slate-800">INR</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl shadow-lg">
                  <RefreshCw size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Last Updated
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currency Rates Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-slate-50 to-gray-50">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg">
                  <DollarSign size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Exchange Rates
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Configure currency conversion rates
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleButtonClick("export-rates")}
                  className={`px-6 py-3 bg-slate-500 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                    clickedButton === "export-rates"
                      ? "scale-95 bg-slate-600 shadow-lg"
                      : "hover:bg-slate-600 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
                <button
                  onClick={updateFromOnline}
                  disabled={isUpdating}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform ${
                    isUpdating
                      ? "scale-95 cursor-not-allowed opacity-75"
                      : clickedButton === "update-online"
                      ? "scale-95 from-blue-600 to-indigo-700 shadow-lg"
                      : "hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105"
                  }`}
                >
                  <RefreshCw
                    size={18}
                    className={isUpdating ? "animate-spin" : ""}
                  />
                  <span>{isUpdating ? "Updating..." : "Update Online"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currencyData.map((currency) => (
                <div
                  key={currency?.code}
                  className="group bg-gradient-to-r from-white to-slate-50/50 rounded-3xl border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 bg-gradient-to-br ${currency?.color} rounded-2xl shadow-lg flex items-center justify-center`}
                      >
                        <span className="text-2xl">{currency?.flag}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {currency?.code}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium">
                          {currency?.name}
                        </p>
                      </div>
                    </div>
                    {currency?.baseRate && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold ring-1 ring-emerald-200">
                        BASE
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 block">
                      Exchange Rate (1 INR = ? {currency?.code})
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={rates[currency?.code]}
                        onChange={(e) =>
                          handleRateChange(currency?.code, e.target.value)
                        }
                        step={currency?.step || "0.001"}
                        disabled={currency?.baseRate}
                        className={`w-full px-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white transition-all duration-300 font-bold text-lg ${
                          currency?.baseRate
                            ? "bg-slate-50 cursor-not-allowed text-slate-500"
                            : "text-slate-800"
                        }`}
                        placeholder={`Enter ${currency?.code} rate`}
                      />
                      {!currency?.baseRate && (
                        <div className="absolute right-3 top-4 text-slate-400 font-medium">
                          {currency?.code}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rate Info */}
                  <div className="mt-4 pt-4 border-t border-slate-200/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">
                        1 INR =
                      </span>
                      <span className="font-bold text-slate-800">
                        {rates[currency?.code]?.toFixed(
                          currency.step === "0.01" ? 2 : 3
                        )}
                        {currency?.code}
                      </span>
                    </div>
                    {!currency?.baseRate && (
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-slate-500 font-medium">
                          1 {currency?.code} =
                        </span>
                        <span className="font-bold text-emerald-600">
                          {(1 / rates[currency?.code])?.toFixed(2)} INR
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
            <button
              onClick={updateItem}
              className={`px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                clickedButton === "update-item"
                  ? "scale-95 from-emerald-600 to-teal-700 shadow-lg"
                  : "hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105"
              }`}
            >
              <Save size={20} />
              <span>Save Currency Rates</span>
            </button>

            <button
              onClick={() => handleButtonClick("reset-rates")}
              className={`px-8 py-4 bg-slate-500 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                clickedButton === "reset-rates"
                  ? "scale-95 bg-slate-600 shadow-lg"
                  : "hover:bg-slate-600 hover:shadow-lg hover:scale-105"
              }`}
            >
              <RefreshCw size={20} />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
