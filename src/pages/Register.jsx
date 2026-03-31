import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.msg || "Registration failed";
      setError(message);
      if (/already.*registered|exists/i.test(message)) {
        setAlreadyRegistered(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Register</h2>

        {error && <p className="bg-red-500 text-white p-2 rounded mb-3">{error}</p>}

        <input
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="w-full mb-3 p-2 bg-gray-800"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-purple-600 py-2 rounded">Register</button>

        <div className="mt-4 text-center text-sm text-gray-300">
          Already registered? 
          <Link to="/login" className="text-purple-300 hover:text-purple-100">
            Login
          </Link>
        </div>

        {alreadyRegistered && (
          <div className="mt-3 text-center text-green-300">
            You already have an account. 
            <Link to="/login" className="font-semibold underline">
              Go to Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
