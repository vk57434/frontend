import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.email !== "admin@gmail.com")) {
      navigate("/dashboard");
      return;
    }

    fetchUsers();
  }, [user, navigate]);

  // ✅ Run draw
  const runDraw = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/draw/run");
      alert(`Winner: ${data.winner} 🎉`);
    } catch (error) {
      alert("Error running draw");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Admin Actions</h2>

          <button
            onClick={runDraw}
            disabled={loading}
            className="bg-purple-500 px-4 py-2"
          >
            {loading ? "Running..." : "Run Draw 🎉"}
          </button>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl mb-4">All Users</h2>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-700">
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}