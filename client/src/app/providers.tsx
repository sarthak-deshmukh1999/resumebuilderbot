"use client";

import { ConversationProvider } from "@/context/ConversationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ConversationProvider>{children}</ConversationProvider>
    </ThemeProvider>
  );
}
