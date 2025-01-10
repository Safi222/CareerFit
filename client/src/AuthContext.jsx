import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const [user, setUser] = useState(null); // Store user profile
  const [isLoading, setIsLoading] = useState(true); // Show loader while fetching
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${serverUri}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, fetchUserProfile, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
