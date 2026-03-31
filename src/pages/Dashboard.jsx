import { useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [score, setScore] = useState("");

  const addScore = async () => {
    await API.post("/score/add", { score });
    alert("Score added!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {/* Score Section */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="text-xl mb-3">Add Score</h2>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="p-2 bg-gray-800 mr-2"
        />
        <button onClick={addScore} className="bg-green-500 px-4 py-2">
          Submit
        </button>
      </div>

      {/* Charity */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="text-xl">Your Charity</h2>
        <p className="text-gray-400">Selected charity will appear here</p>
      </div>

      {/* Subscription */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="text-xl">Subscription</h2>
        <p>Active</p>
      </div>
    </div>
  );
}