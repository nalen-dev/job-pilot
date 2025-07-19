"use client";

import { Home, ChartBar, Settings, LogOut, FileEdit } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const items = [
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
      // url: "#",
      icon: ChartBar,
      child: [
        {
          title: "Analyze",
          url: "/analyze-cv",
        },
        {
          title: "Skill Gap Insight",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
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
              {items.map((item) => {
                const isChildActive = item.child?.some(
                  (child) => pathname === child.url
                );
                return (
                  <Collapsible key={item.title} defaultOpen={isChildActive}>
                    <SidebarMenuItem>
                      {item.child ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className="hover:bg-gray-100 text-gray-500 hover:text-cv-primary"
                              asChild
                            >
                              <a href={item.url} className="">
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {item.child.map((x) => {
                              return (
                                <SidebarMenuSub key={x.title}>
                                  <SidebarMenuButton
                                    className={cn(
                                      "hover:bg-gray-100 text-gray-500 hover:text-cv-primary cursor-pointer",
                                      {
                                        "bg-cv-primary text-white rounded-sm":
                                          x.url == pathname,
                                      }
                                    )}
                                    asChild
                                  >
                                    <a href={x.url}>{x.title}</a>
                                  </SidebarMenuButton>
                                </SidebarMenuSub>
                              );
                            })}
                          </CollapsibleContent>
                        </>
                      ) : (
                        <SidebarMenuButton
                          className={cn(
                            "hover:bg-gray-100 text-gray-500 hover:text-cv-primary",
                            {
                              "bg-cv-primary text-white rounded-sm":
                                item.url == pathname,
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
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
