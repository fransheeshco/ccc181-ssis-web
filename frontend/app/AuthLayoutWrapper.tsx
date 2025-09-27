"use client";

import { useAuth } from "@/app/context/authContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: AuthLayoutWrapperProps) => {
  const { isAuthenticated, loading } = useAuth();

  // While loading session, render nothing (or spinner if you want)
  if (loading) return null;

  return (
    <>
      {/* Sidebar only shows if authenticated */}
      {isAuthenticated && <AppSidebar />}

      <main className="flex-1 overflow-auto relative">
        {isAuthenticated && <SidebarTrigger className="absolute" />}
        <div className="p-6 w-full">{children}</div>
      </main>
    </>
  );
};
