"use client"
import {
  Home,
  Search,
  Users,
  MessageCircle,
  Bell,
  User,
  Plus,
  GraduationCap,
  BookOpen,
  School,
  BookMarked,
  Settings
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

const navItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
    hasLine: true
  },
  {
    title: "Classmates",
    url: "#",
    icon: Users,
  },
  {
    title: "Schools",
    url: "/schools",
    icon: School,
  },
  {
    title: "Tests",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Απουσιολόγιο",
    url: "/apousiologio",
    icon: BookMarked,
    badge: "Soon..."
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {

  const router = useRouter();
  const [selected, setSelected] = useState("Dashboard")

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className=" ">
        <div className="flex items-center p-2 gap-2 rounded-lg border-2 border-gray-100 bg-white">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Image width={60} height={60} alt="CySchool Logo" src="/CySchool1.png" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">CySchool</div>
            <div className="text-xs text-gray-500">Community</div>
          </div>
        </div>
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded border">
              ⌘F
            </kbd>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1 py-4">


        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full justify-start px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-gray-50 hover:text-gray-900do",
                      selected === item.title
                        ? "bg-white border-2 border-gray-100 px-2.5 py-4 text-gray-900"
                        : "text-gray-600"
                    )}
                  >
                    <button
                      onClick={() => {
                        setSelected(item.title)
                        router.push(item.url)
                      }}
                      className="flex items-center gap-4 w-full"
                    >
                      <item.icon className="!w-5 !h-5" />
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs bg-gray-200 text-gray-700 hover:bg-gray-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                  {item.hasLine && (
                    <hr className="bg-gray-100 h-0.5 mt-2.5"></hr>
                  )}
                </SidebarMenuItem>

              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">KD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Kevin Dukkon</div>
            <div className="text-xs text-gray-500 truncate">kevin@stripe.io</div>
          </div>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <User className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          © 2023 Stripe, Inc. v11.0.1v
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}