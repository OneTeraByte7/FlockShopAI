// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center max-w-7xl mx-auto">
      <Link to="/" className="text-xl font-bold text-[#0A4D68]">
        FlockShop
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">
              Welcome, <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#0A4D68] hover:bg-[#083a4d] text-white px-3 py-1 rounded-xl text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#0A4D68]">
              Login
            </Link>
            <Link to="/signup" className="hover:text-[#0A4D68]">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
