"use client";

import {
  Home,
  ChartBar,
  HelpCircle,
  Settings,
  LogOut,
  FileEdit,
  PencilIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { logoutAction } from "@/app/(auth)/action";
import { Button } from "../ui/button";

export function AppSidebar() {
  const pathname = usePathname();
  const [state, action, pending] = useActionState(logoutAction, null);

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Upload & Manage CV",
      url: "/manage-cv",
      icon: FileEdit,
    },
    {
      title: "Analyze CV",
      url: "/analyze-cv",
      icon: ChartBar,
    },
    {
      title: "Assessment",
      url: "/assessment",
      icon: PencilIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg my-2 pb-3 text-right justify-center w-full border-b rounded-none">
            JobPilot
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <Collapsible key={item.title}>
                  <SidebarMenuItem>
                    {item.child ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="hover:bg-gray-100 text-gray-500 hover:text-cv-primary"
                            asChild
                          >
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {item.child.map((childItem) => (
                            <SidebarMenuSub key={childItem.title}>
                              <SidebarMenuButton className="hover:bg-gray-100 text-gray-500 hover:text-cv-primary cursor-pointer">
                                {childItem.title}
                              </SidebarMenuButton>
                            </SidebarMenuSub>
                          ))}
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        className={cn(
                          "hover:bg-gray-100 text-gray-500 hover:text-cv-primary",
                          {
                            "bg-cv-primary text-white rounded-sm":
                              item.url === pathname,
                          }
                        )}
                        asChild
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              <SidebarMenuItem key="logout">
                <form action={action}>
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-gray-100 text-gray-500 hover:text-cv-primary hover:cursor-pointer justify-start gap-3"
                    type="submit"
                    disabled={pending}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
