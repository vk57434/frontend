import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-600 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button 
          disabled={loading}
          className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-300">
          Don't have an account? 
          <Link to="/register" className="text-purple-300 hover:text-purple-100 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}