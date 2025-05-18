"use client";

import React from "react";
import type { ConversationListProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConversationList({
  conversations,
  currentConversationId,
  setCurrentConversationId,
  deleteConversation,
}: ConversationListProps) {
  // Sort conversations by updatedAt date (newest first)
  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {sortedConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-1"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start truncate px-2 text-sm font-normal h-9",
                  conversation.id === currentConversationId &&
                    "bg-slate-200 dark:bg-slate-800"
                )}
                onClick={() => setCurrentConversationId(conversation.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      `Delete conversation "${conversation.title}"? This cannot be undone.`
                    )
                  ) {
                    deleteConversation(conversation.id);
                  }
                }}
                title="Right click to delete"
              >
                <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{conversation.title}</span>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
