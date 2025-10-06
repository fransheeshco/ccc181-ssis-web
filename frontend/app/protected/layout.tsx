"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto relative bg-gray-50">
          {/* ✅ Sidebar Toggle Button */}
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
