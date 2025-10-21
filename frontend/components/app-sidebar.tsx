"use client";

import { useAuth } from "@/app/context/authContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BookOpen, Users, Settings, School } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link

export function AppSidebar() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return null;

  return (
    <Sidebar>
      {/* ✅ Header */}
      <SidebarHeader className="bg-primary px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/OracleLogo.png"  // Should be just this
            alt="Oracle-Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-2xl font-extrabold text-white">Oracle</span>
        </div>
      </SidebarHeader>

      {/* ✅ Main navigation */}
      <SidebarContent className="bg-sidebarbg">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/protected/students"
                    className="flex items-center gap-3 px-4 py-2"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-lg font-semibold">Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/protected/programs"
                    className="flex items-center gap-3 px-4 py-2"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="text-lg font-semibold">Program</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/protected/colleges"
                    className="flex items-center gap-3 px-4 py-2"
                  >
                    <School className="h-6 w-6" />
                    <span className="text-lg font-semibold">College</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ Footer */}
      <SidebarFooter className="bg-sidebarbg px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/protected/settings" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}