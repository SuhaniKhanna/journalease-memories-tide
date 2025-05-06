
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpenText,
  Calendar,
  Home,
  Mic,
  PenSquare,
  LineChart,
  LogOut,
} from "lucide-react";

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "New Entry",
      path: "/new-entry",
      icon: PenSquare,
    },
    {
      title: "Past Entries",
      path: "/past-entries",
      icon: BookOpenText,
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      title: "Voice Memos",
      path: "/voice-memos",
      icon: Mic,
    },
    {
      title: "Progress",
      path: "/progress",
      icon: LineChart,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4">
        <div className="flex justify-between items-center">
          <Logo />
          <SidebarTrigger className="lg:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                className="w-full justify-start gap-2 font-normal"
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/40 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoUrl} alt={user?.name} />
              <AvatarFallback className="bg-journease-purple text-white">
                {user?.name?.substring(0, 2).toUpperCase() || "JE"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
