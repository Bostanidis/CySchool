import { 
  Home, 
  Search, 
  Users, 
  MessageCircle, 
  Bell,
  User,
  Plus,
  GraduationCap,
  BookOpen
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
  SidebarFooter
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Friends",
    url: "#",
    icon: Users,
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageCircle,
    badge: "3"
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
    badge: "12"
  },
  {
    title: "Schools",
    url: "#",
    icon: GraduationCap,
  },
  {
    title: "Classmates",
    url: "#",
    icon: Users,
  },
  {
    title: "Tests",
    url: "#",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-transparent border-0 h-screen flex flex-col">
      <SidebarHeader className="p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold">CySchool</h1>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 overflow-hidden my-6 mx-3">
        <SidebarMenu className="flex h-[100%] justify-between">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-12 text-base hover:bg-gray-100">
                <a href={item.url} className="flex items-center gap-6 px-4">
                  <item.icon className="!h-6 !w-6 !font-normal"  />
                  <span className="text-base font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-sm">
                      {item.badge}
                    </Badge>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 flex-shrink-0">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-14 hover:bg-gray-100">
            <a href="#" className="flex items-center gap-4 px-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="!h-5 !w-5" style={{ width: '20px', height: '20px' }} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-medium">Maria C.</span>
                <span className="text-sm text-muted-foreground">12th Grade</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}