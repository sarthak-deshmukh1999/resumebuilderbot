"use client";

import React, { useState, useRef } from "react";
import type { Message as MessageType, MessageContentPart } from "@/types";
import { MessageContent } from "./MessageContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MessageProps {
  message: MessageType;
  isLastMessage?: boolean;
  onEdit?: (id: string, content: MessageContentPart[]) => void;
}

export function Message({ message, isLastMessage, onEdit }: MessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // For user avatar, use initials; for assistant, use a custom image
  const getAvatarContent = () => {
    if (message.role === "user") {
      return <AvatarFallback>U</AvatarFallback>;
    } else if (message.role === "assistant") {
      return (
        <>
          <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </>
      );
    } else {
      return <AvatarFallback>S</AvatarFallback>;
    }
  };

  const handleStartEdit = () => {
    // Only allow editing user messages
    if (message.role !== "user") return;

    // Extract just the text content for editing
    const textParts = message.content.filter(part => part.type === "text");
    setEditContent(textParts.map(part => part.content).join("\n\n"));
    setIsEditing(true);

    // Focus textarea after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleSaveEdit = () => {
    if (!onEdit) return;

    // Convert edited text back to MessageContentPart array
    const updatedContent: MessageContentPart[] = [
      { type: "text", content: editContent }
    ];

    onEdit(message.id, updatedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`py-5 ${
        message.role === "assistant" ? "bg-slate-50 dark:bg-slate-900/50" : ""
      }`}
    >
      <div className="container max-w-4xl mx-auto flex gap-4 group">
        <div className="flex-shrink-0 pt-1">
          <Avatar className={message.role === "assistant" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}>
            {getAvatarContent()}
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1 text-sm">
            <span className="font-medium">
              {message.role === "user" ? "You" : message.role === "assistant" ? "Resume-Builder" : "System"}
            </span>
            {message.edited && (
              <span className="ml-2 text-xs text-slate-500">(edited)</span>
            )}
          </div>

          {message.isPending ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-[300px]" />
              <Skeleton className="h-4 w-full max-w-[250px]" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
          ) : isEditing ? (
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[100px] resize-none"
                placeholder="Edit your message..."
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit}>
                  <Check className="mr-1 h-4 w-4" /> Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="mr-1 h-4 w-4" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>

        {/* Edit button (only for user messages and not while editing) */}
        {message.role === "user" && !isEditing && !message.isPending && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500"
              onClick={handleStartEdit}
            >
              <Pencil size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
