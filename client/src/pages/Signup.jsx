import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function Signup() {
  const { user, signup, loading, error } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    if (!error) setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 relative">
        <h2 className="text-2xl font-semibold text-center text-[#0A4D68] mb-6">Create an Account</h2>

        {success && (
          <div className="absolute top-2 left-2 right-2 bg-green-100 text-green-800 text-sm px-4 py-2 rounded-md shadow">
            Signup successful! Redirecting...
          </div>
        )}

        {error && (
          <div className="absolute top-2 left-2 right-2 bg-red-100 text-red-800 text-sm px-4 py-2 rounded-md shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A4D68] hover:bg-[#083a4d] text-white font-medium py-2 rounded-xl transition duration-200"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0A4D68] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
