"use client";

import React from "react";
import ThemeToggle from "./Theme-toggle";
import { Menu, Bell, Settings, User, Home } from "lucide-react";
import { useSidebar } from "../SidebarContext";
import SettingsPopover from "./settingsPopover";
import ProfilePopover from "./ProfilePopover";

const Navbar = () => {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-navbar border-b border-border transition-all duration-300 ease-out sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg transition-all duration-300 ease-out text-main-primary  hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110 active:scale-95"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className={`transition-transform duration-300 cursor-pointer text-main-primary  ${isOpen ? '' : 'rotate-180'}`} />
        </button>
        
        <div className="flex items-center gap-2 overflow-hidden">
          <Home size={18} className="text-main-primary flex-shrink-0" />
          <h1 className={`font-medium text-text-primary transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md transition-all duration-200 ease-out hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110">
            <Bell size={18} className="text-main-primary " />
          </button>

        <SettingsPopover/>

          <ProfilePopover/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;