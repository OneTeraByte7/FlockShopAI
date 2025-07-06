import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  try {
    const saved = localStorage.getItem("user");
    const parsed = saved ? JSON.parse(saved) : null;
    // validate structure
    if (parsed && parsed.email && parsed.id) return parsed;
    return null;
  } catch {
    return null;
  }
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
