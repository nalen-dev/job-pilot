import AppHeader from "@/components/custom/app-header";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="text-gray-500 hover:text-gray-600 cursor-pointer" />
      <div className="relative w-full my-4 mx-2">
        <AppHeader />
        <div className="px-3">{children}</div>
      </div>
    </SidebarProvider>
  );
}
