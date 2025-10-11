"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "@/app/context/authContext";  
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

// Configure axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const { data } = await api.post("/users/token/refresh");
      console.log("REFRESH RESPONSE DATA:", data);
      setUser(data.user);
    } catch (error) {
      console.error("Failed to refresh user session:", error);
      setUser(null);
      // Don't throw error here - it's expected if no valid refresh token exists
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await api.post("/users/login", { email, password });
      await refreshUser(); // Refresh user data after successful login
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response?.status === 401) {
        throw new Error("Invalid email or password");
      } else if (error.response?.status === 400) {
        throw new Error("Invalid request data");
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setLoading(false);
      window.location.href = "/"; // Redirect to login page
    }
  };

  // Automatically check cookies when the app loads
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};