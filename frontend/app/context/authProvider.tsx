"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "@/app/context/authContext";  

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user session on mount
  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users/token/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh user session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Placeholder login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        credentials: "include", // include cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        await refreshUser();
      } else {
        throw new Error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Placeholder logout
  const logout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
