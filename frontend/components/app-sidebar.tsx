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
} from "@/components/ui/sidebar"
import { BookOpen, Users, Settings, School } from "lucide-react"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row justify-start">
          <Image
            src="/OracleLogo.png"
            alt="Oracle-Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <div className="text-5xl font-extrabold text-white">Oracle</div>
        </div>

      </SidebarHeader>

      {/* ✅ Main navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="p-2">
                  <a href="/colleges">
                    <School className="mr-2 h-16 w-16" />
                    <h1 className="text-3xl font-bold" >College</h1>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="p-2">
                  <a href="/students">
                    <Users className="mr-2 h-16 w-16" />
                    <h1 className="text-3xl font-bold">Students</h1>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="p-2">
                  <a href="/programs">
                    <BookOpen className="mr-2 h-16 w-16" />
                    <h1 className="text-3xl font-bold">Program</h1>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ Bottom footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
