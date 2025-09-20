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
  SidebarTrigger
} from "@/components/ui/sidebar"
import { BookOpen, Users, Settings, School } from "lucide-react"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar>
      {/* ✅ Header with logo + title */}
      <SidebarHeader className="bg-primary px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/OracleLogo.png"
            alt="Oracle-Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-2xl font-extrabold text-white">
            Oracle
          </span>
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
                  <a href="/students" className="flex items-center gap-3 px-4 py-2">
                    <Users className="h-6 w-6" />
                    <span className="text-lg font-semibold">Students</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/programs" className="flex items-center gap-3 px-4 py-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-lg font-semibold">Program</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/colleges" className="flex items-center gap-3 px-4 py-2">
                    <School className="h-6 w-6" />
                    <span className="text-lg font-semibold">College</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ Bottom footer */}
      <SidebarFooter className="bg-sidebarbg px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
