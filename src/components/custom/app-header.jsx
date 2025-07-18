"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AppHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/manage-cv")) return "Manage CV";
    if (pathname.startsWith("/analyze")) return "Analyze CV";
    return "Dashboard";
  };
  return (
    <header className="w-full items-center border-b pb-4 flex justify-between pr-10">
      <h2 className="text-2xl font-semibold px-3">{getTitle()}</h2>
      <section className="flex gap-3 items-center">
        <Button className="rounded text-xs border-cv-main border cursor-pointer bg-white text-cv-primary hover:bg-gray-100">
          Back to Homepage
        </Button>
        <span className="relative">
          <div className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full right-[1px]"></div>
          <BellIcon
            className="text-gray-500 hover:text-cv-primary cursor-pointer"
            size={18}
          />
        </span>
      </section>
    </header>
  );
}
