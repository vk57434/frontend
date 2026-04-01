import { useState } from "react";
import API from "../api/api";

// Fixed Mock Data
const mockStats = {
  totalUsers: 1246,
  totalCharities: 18,
  totalDraws: 45,
  averageScore: 7850,
};



const mockCharities = [
  {
    id: 1,
    name: "Red Cross",
    description: "International humanitarian organization",
    users: 245,
    totalFunds: 45000,
  },
  {
    id: 2,
    name: "UNICEF",
    description: "Children's support organization",
    users: 189,
    totalFunds: 32500,
  },
  {
    id: 3,
    name: "World Vision",
    description: "Global development and poverty relief",
    users: 312,
    totalFunds: 58900,
  },
  {
    id: 4,
    name: "Save the Children",
    description: "Child welfare organization",
    users: 156,
    totalFunds: 28400,
  },
  {
    id: 5,
    name: "Oxfam",
    description: "International charity fighting poverty",
    users: 203,
    totalFunds: 42800,
  },
];

const mockDraws = [
  {
    id: 1,
    numbers: [12, 35, 47, 58, 23],
    date: "2024-03-28",
    winner: "John Doe",
    prize: 5000,
  },
  {
    id: 2,
    numbers: [15, 28, 41, 52, 67],
    date: "2024-03-21",
    winner: "Mike Thompson",
    prize: 7500,
  },
  {
    id: 3,
    numbers: [08, 22, 39, 54, 71],
    date: "2024-03-14",
    winner: "Emma Wilson",
    prize: 5000,
  },
  {
    id: 4,
    numbers: [18, 33, 45, 61, 79],
    date: "2024-03-07",
    winner: "Alex Kumar",
    prize: 10000,
  },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const runDraw = async () => {
    setLoading(true);
    try {
      const { data } = await API.post("/admin/run-draw");
      alert("Draw executed! Numbers: " + data.numbers.join(", "));
    } catch (error) {
      alert("Error running draw: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 shadow-lg">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-red-100 mt-2">Manage users, charities, and draws</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800/50">
        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "charities", label: "Charities" },
          { id: "draws", label: "Draws" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-red-500 text-red-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
                <p className="text-blue-100 text-sm uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-4xl font-bold mt-2">{mockStats.totalUsers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg">
                <p className="text-green-100 text-sm uppercase tracking-wide">
                  Total Charities
                </p>
                <p className="text-4xl font-bold mt-2">
                  {mockStats.totalCharities}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg">
                <p className="text-purple-100 text-sm uppercase tracking-wide">
                  Total Draws
                </p>
                <p className="text-4xl font-bold mt-2">{mockStats.totalDraws}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-6 shadow-lg">
                <p className="text-orange-100 text-sm uppercase tracking-wide">
                  Avg Score
                </p>
                <p className="text-4xl font-bold mt-2">
                  {mockStats.averageScore}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <button
                onClick={runDraw}
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 px-8 py-3 rounded-lg font-bold transition-all shadow-lg"
              >
                {loading ? "Running..." : "Run Draw"}
              </button>
            </div>

            {/* Admin Credentials */}
            <div className="bg-gradient-to-r from-yellow-900 to-yellow-800 rounded-lg p-6 shadow-lg border border-yellow-600">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-2">🔐</span> Admin Credentials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded p-4">
                  <p className="text-yellow-200 text-sm uppercase tracking-wide mb-2">Email</p>
                  <p className="text-xl font-mono text-yellow-300">admin@gmail.com</p>
                </div>
                <div className="bg-black/30 rounded p-4">
                  <p className="text-yellow-200 text-sm uppercase tracking-wide mb-2">Password</p>
                  <p className="text-xl font-mono text-yellow-300">admin@123</p>
                </div>
              </div>
              <p className="text-yellow-200 text-sm mt-4">Use these credentials to log in as admin and access all dashboard features.</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Recent Draws</h2>
              <div className="space-y-3">
                {mockDraws.slice(0, 3).map((draw) => (
                  <div
                    key={draw.id}
                    className="bg-gray-700 rounded p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{draw.winner}</p>
                      <p className="text-sm text-gray-400">{draw.date}</p>
                    </div>
                    <span className="text-yellow-400 font-bold">
                      ${draw.prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* Charities Tab */}
        {activeTab === "charities" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Charities Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCharities.map((charity) => (
                <div
                  key={charity.id}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{charity.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {charity.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Users:</span>
                      <span className="font-semibold text-blue-400">
                        {charity.users}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Funds:</span>
                      <span className="font-semibold text-green-400">
                        ${charity.totalFunds}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Draws Tab */}
        {activeTab === "draws" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Draws History</h2>
            <div className="space-y-4">
              {mockDraws.map((draw) => (
                <div
                  key={draw.id}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Draw #{draw.id}</p>
                      <p className="text-gray-400">{draw.date}</p>
                    </div>
                    <span className="text-xl font-bold text-yellow-400">
                      Prize: ${draw.prize}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Numbers:</p>
                    <div className="flex gap-2 flex-wrap">
                      {draw.numbers.map((num, idx) => (
                        <span
                          key={idx}
                          className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center font-bold"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">
                      Winner: {draw.winner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}