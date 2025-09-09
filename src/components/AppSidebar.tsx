import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  ChefHat,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Clock,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Customer Portal", url: "/customer", icon: MessageSquare },
  { title: "Admin Dashboard", url: "/admin", icon: Calendar },
  { title: "Kitchen View", url: "/kitchen", icon: ChefHat },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const adminItems = [
  { title: "Reservations", url: "/admin/reservations", icon: Users },
  { title: "Tables", url: "/admin/tables", icon: Calendar },
  { title: "Orders", url: "/admin/orders", icon: Clock },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = navigationItems.some((i) => isActive(i.url)) || adminItems.some((i) => isActive(i.url));

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-gradient-restaurant text-primary-foreground font-medium shadow-glow"
      : "hover:bg-primary/10 hover:text-primary transition-smooth";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-gradient-subtle">
        <div className="p-4 border-b">
          <NavLink to="/" className="block">
            <h2 className={`font-bold text-lg text-primary ${state === "collapsed" ? "text-center" : ""}`}>
              {state === "collapsed" ? "🍽️" : "🍽️ RestaurantPro"}
            </h2>
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {currentPath.startsWith("/admin") && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary font-semibold">
              Admin Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}