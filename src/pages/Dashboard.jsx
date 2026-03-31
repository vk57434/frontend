import { useState, useEffect } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState("");

  // Fetch scores
  const fetchScores = async () => {
    const { data } = await API.get("/score");
    setScores(data.scores || []);
  };

  // Fetch charities
  const fetchCharities = async () => {
    const { data } = await API.get("/charity");
    setCharities(data);
  };

  useEffect(() => {
    fetchScores();
    fetchCharities();
  }, []);

  // Add score
  const addScore = async () => {
    await API.post("/score/add", { score });
    setScore("");
    fetchScores();
  };

  // Select charity
  const selectCharity = async () => {
    await API.post("/charity/select", {
      charityId: selectedCharity,
    });
    alert("Charity selected!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {/* Add Score */}
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

      {/* Score List */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="text-xl mb-3">Your Scores</h2>

        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          <ul>
            {scores.map((s, i) => (
              <li key={i}>
                {s.value} — {new Date(s.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Charity Section (NEW) */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="text-xl mb-3">Select Charity</h2>

        <select
          onChange={(e) => setSelectedCharity(e.target.value)}
          className="p-2 bg-gray-800 mr-2"
        >
          <option value="">Choose charity</option>
          {charities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={selectCharity}
          className="bg-blue-500 px-4 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}