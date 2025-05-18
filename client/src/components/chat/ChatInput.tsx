"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import type { ChatInputProps } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export function ChatInput({ onSendMessage, disabled = false, placeholder = "Message Resume-Builder..." }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim() === "" || disabled) return;
    onSendMessage(message);
    setMessage("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4">
      <div className="container max-w-4xl mx-auto">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pr-12 py-3 min-h-[52px] max-h-[200px] resize-none"
            disabled={disabled}
          />
          <Button
            className="absolute right-2 bottom-1.5"
            size="icon"
            disabled={message.trim() === "" || disabled}
            onClick={handleSendMessage}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-center text-slate-500">
          <span>Resume Builder can make mistakes. Verify important information.</span>
        </div>
      </div>
    </div>
  );
}
