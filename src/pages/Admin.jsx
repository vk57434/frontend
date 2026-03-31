import API from "../api/api";

export default function Admin() {
  const runDraw = async () => {
    const { data } = await API.post("/admin/run-draw");
    alert("Draw numbers: " + data.numbers.join(", "));
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl mb-4">Admin Panel</h1>

      <button 
        onClick={runDraw}
        className="bg-red-500 px-6 py-3 rounded"
      >
        Run Draw
      </button>
    </div>
  );
}