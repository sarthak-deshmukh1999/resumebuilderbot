"use client";

import React from "react";
import { ChatHeader } from "./ChatHeader";
import { Sidebar } from "./Sidebar";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useConversation } from "@/context/ConversationContext";
import type { Message, MessageContentPart } from "@/types";

export function ChatLayout() {
  const {
    conversations,
    currentConversationId,
    addMessage,
    updateMessage,
  } = useConversation();

  // Get current conversation and its messages
  const currentConversation = conversations.find(
    (conversation) => conversation.id === currentConversationId
  );
  const messages = currentConversation?.messages || [];

  // Handle new message from user
  const handleSendMessage = (content: string) => {
    // Simple parser to detect code blocks with triple backticks
    const parseMessageContent = (text: string): MessageContentPart[] => {
      const parts: MessageContentPart[] = [];

      // Basic detection of code blocks with triple backticks
      const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
      let lastIndex = 0;
      let match;

      // Extract code blocks
      while ((match = codeBlockRegex.exec(text)) !== null) {
        // Add any text before the code block
        if (match.index > lastIndex) {
          const textBefore = text.substring(lastIndex, match.index).trim();
          if (textBefore) {
            parts.push({ type: "text", content: textBefore });
          }
        }

        // Add the code block
        const language = match[1] || "text";
        const code = match[2].trim();
        parts.push({ type: "code", content: code, language });

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text after the last code block
      if (lastIndex < text.length) {
        const remainingText = text.substring(lastIndex).trim();
        if (remainingText) {
          parts.push({ type: "text", content: remainingText });
        }
      }

      // If no code blocks were found, just add the entire text
      if (parts.length === 0) {
        parts.push({ type: "text", content: text });
      }

      return parts;
    };

    const newMessage: Omit<Message, "id" | "createdAt"> = {
      role: "user",
      content: parseMessageContent(content),
    };

    addMessage(newMessage);
  };

  // Handle editing a message
  const handleEditMessage = (id: string, content: MessageContentPart[]) => {
    updateMessage(id, content);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-72">
        <ChatHeader />

        <main className="flex-1 pt-14 pb-32 overflow-hidden">
          <MessageList
            messages={messages}
            onEditMessage={handleEditMessage}
          />
        </main>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={false}
        />
      </div>
    </div>
  );
}
