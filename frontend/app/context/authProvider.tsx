"use client";

import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "@/app/context/authContext";  

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ⬅️ start as true so we wait for cookie check

  const refreshUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/token/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("REFRESH RESPONSE DATA:", data);
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

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        await refreshUser(); // ✅ Only refresh *after* successful login
        console.log("Refresh response:", res.status, await res.text());
      } else {
        throw new Error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

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
      window.location.href = "/"; // Redirect to login page
    }
  };

  // ✅ Automatically check cookies when the app loads
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
       {!loading && children}
    </AuthContext.Provider>
  );
};
