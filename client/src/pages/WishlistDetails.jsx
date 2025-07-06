import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function WishlistDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", imageUrl: "", price: "" });
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/wishlists/${id}`);
      setWishlist(res.data);
    } catch {
      console.error("Error fetching wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [id]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/wishlists/${id}/items`, {
        ...newItem,
        addedBy: user.email,
        price: parseFloat(newItem.price),
      });
      setNewItem({ name: "", imageUrl: "", price: "" });
      fetchWishlist();
    } catch (err) {
      console.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  if (!wishlist) return <p className="text-center mt-10">Loading wishlist...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#0A4D68] mb-4">{wishlist.title}</h2>

      <form onSubmit={handleAddItem} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full border px-4 py-2 rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.imageUrl}
          onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
          className="w-full border px-4 py-2 rounded-xl"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: e.target.value })}
          className="w-full border px-4 py-2 rounded-xl"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0A4D68] text-white px-4 py-2 rounded-xl"
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      <div className="grid gap-4">
        {wishlist.items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          wishlist.items.map((item, i) => (
            <div key={i} className="border p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg" />
                )}
                <div>
                  <h3 className="font-semibold text-[#0A4D68]">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <p className="text-xs text-gray-400">Added by: {item.addedBy}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
