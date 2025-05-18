"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ConversationList } from "./ConversationList";
import { useConversation } from "@/context/ConversationContext";
import { useTheme } from "@/context/ThemeContext";
import { MessageSquarePlus, Moon, Sun, Computer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const { conversations, currentConversationId, setCurrentConversationId, addConversation, deleteConversation } = useConversation();
  const { theme, setTheme } = useTheme();

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-shrink-0 p-4">
        <Button
          className="w-full justify-start"
          onClick={addConversation}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      <Separator />

      <div className="flex-1 min-h-0 overflow-y-auto">
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversationId}
          setCurrentConversationId={setCurrentConversationId}
          deleteConversation={deleteConversation}
        />
      </div>

      <Separator />

      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {theme === 'light' && <Sun className="mr-2 h-4 w-4" />}
              {theme === 'dark' && <Moon className="mr-2 h-4 w-4" />}
              {theme === 'system' && <Computer className="mr-2 h-4 w-4" />}
              <span className="capitalize">{theme} Mode</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Computer className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 min-h-0">
      {sidebarContent}
    </div>
  );
}
