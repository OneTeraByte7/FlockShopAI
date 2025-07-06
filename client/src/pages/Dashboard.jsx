import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [wishlists, setWishlists] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWishlists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlists", {
        params: { email: user.email },
      });
      setWishlists(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlists", err);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, [user.email]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/wishlists", {
  title,
  creatorEmail: user.email,
  creatorName: user.name,
});

      setTitle("");
      fetchWishlists(); // ✅ now works
    } catch (err) {
      setError("Failed to create wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0A4D68] mb-4">Your Wishlists</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter wishlist title"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0A4D68] text-white px-4 py-2 rounded-xl hover:bg-[#083a4d]"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-4">
        {wishlists.length === 0 ? (
          <p className="text-gray-600">No wishlists yet.</p>
        ) : (
          wishlists.map((wl) => (
            <Link
              to={`/wishlist/${wl._id}`}
              key={wl._id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-[#0A4D68]">{wl.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Created by: {wl.creatorName}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
