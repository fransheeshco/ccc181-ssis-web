"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "@/app/context/authContext";
import axios from "axios";
import { showToast } from "@/lib/toast";

interface AuthProviderProps {
  children: ReactNode;
}

// Configure axios instance with default settings
const api = axios.create({
  baseURL: "/api/users",
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
      const { data } = await api.post("/token/refresh");
      console.log("REFRESH RESPONSE DATA:", data);
      setUser(data.user);
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error("Failed to refresh user session:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    // First, wait for login to complete and cookies to be set
    const loginResponse = await api.post("/login", { email, password });
    console.log("✅ Login response:", loginResponse.data);
    
    // Add a small delay to ensure cookies are set
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Now refresh the user with the new cookies
    await refreshUser();
    
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

  const register = async (username: string, email: string, password: string) => {
  setLoading(true);
  try {
    await api.post("/register", { username, email, password });
  } catch (error: any) {
    console.error("Register failed:", error);
    if (error.response?.status === 401) {
      throw new Error("Invalid email or password");
    } else if (error.response?.status === 400) {
      throw new Error("Invalid request data");
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
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
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};