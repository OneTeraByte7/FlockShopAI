import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
  const { user, login, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-[#0A4D68] mb-6">Login to FlockShop</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A4D68] hover:bg-[#083a4d] text-white font-medium py-2 rounded-xl transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account? <Link to="/signup" className="text-[#0A4D68] font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
