"use client";

import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import type { MessageListProps } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MessageList({ messages, onEditMessage }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Filter out system messages for display
  const displayMessages = messages.filter(message => message.role !== "system");

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full overflow-y-auto pr-4">
      <div className="pb-32">
        {displayMessages.length === 0 ? (
          <div className="flex justify-center items-center h-full pt-20">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
              <p className="text-slate-500 text-sm">
                Ask me anything! I can write code, explain concepts, generate content, and more.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Only render each message once, keep skeleton loading in Message */}
            {displayMessages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isLastMessage={index === displayMessages.length - 1}
                onEdit={onEditMessage}
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
