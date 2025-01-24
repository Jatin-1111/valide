'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://validebackend.onrender.com/api/check-auth",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIsLoggedIn(data.success);
      if (!data.success) localStorage.removeItem("token");
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("https://validebackend.onrender.com/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, checkAuthStatus, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
