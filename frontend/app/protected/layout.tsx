"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only check after loading is fully done
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Don't render anything until refreshUser() has finished
  if (loading) return <div>Loading...</div>;

  // After loading, if still no user → show nothing to prevent flash
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
