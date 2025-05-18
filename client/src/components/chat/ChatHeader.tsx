"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { MessageSquarePlus } from "lucide-react";
import { useConversation } from "@/context/ConversationContext";

export function ChatHeader() {
  const { addConversation } = useConversation();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        <div className="md:hidden mr-2">
          <Sidebar isMobile />
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold">Resume Builder</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            onClick={addConversation}
          >
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>
    </header>
  );
}
