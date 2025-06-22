"use client";


import {
  BarChart,
  Film,
  Home,
  MessageSquare,
  Settings,
  User,
  Users
}from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "../logo";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";



export default function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
      exact: true
    },
    {
      title: "Movies",
      icon: Film,
      href: "/admin/movies"
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users"
    },
    {
      title: "Reviews",
      icon: MessageSquare,
      href: "/admin/reviews"
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/admin/analytics"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings"
    },
    {
      title: "Profile",
      icon: User,
      href: "/admin/profile"
    }
  ]

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <Sidebar className="bg-primary/5 border-r border-primary/20">
      <SidebarHeader className="flex flex-col ">
        <div className="flex items-center p-2">

          <Logo className="h-8 w-8"/>
          <h2 className="ml-2 text-xl font-bold">CinesScope</h2>
          <div className="ml-auto flex items-center">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="w-64 ">

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item)=>(<sidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href} className={isActive(item) ? "bg-primary/10" : ""}>
                  <item.icon className="mr-2 h-4 w-4" /><span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </sidebarMenuItem>))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <sidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Profile"}>
                  <Link href="/admin/profile">
                  <User className="h-4 w-4"/>
                  <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </sidebarMenuItem>

              <sidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Public Site"}>
                  <Link href="/admin/public-site">
                  <Film className="h-4 w-4"/>
                  <span>Public Site</span>
                  </Link>
                </SidebarMenuButton>
              </sidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
