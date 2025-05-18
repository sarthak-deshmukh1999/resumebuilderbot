"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Conversation, ConversationContextProps, Message, MessageContentPart } from "@/types";

const ConversationContext = createContext<ConversationContextProps | undefined>(undefined);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Initialize with a default conversation on first load
  useEffect(() => {
    if (conversations.length === 0) {
      const initialConversation: Conversation = {
        id: generateId(),
        title: "New conversation",
        messages: [
          {
            id: generateId(),
            role: "system",
            content: [{ type: "text", content: "How can I help you today?" }],
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      setConversations([initialConversation]);
      setCurrentConversationId(initialConversation.id);
    }
  }, [conversations.length]);

  // Load conversations from localStorage if available
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    const storedConversations = localStorage.getItem("conversations");
    if (storedConversations) {
      try {
        const parsedConversations = JSON.parse(storedConversations) as Conversation[];
        // Convert string dates back to Date objects
        const formattedConversations = parsedConversations.map(conversation => ({
          ...conversation,
          createdAt: new Date(conversation.createdAt),
          updatedAt: new Date(conversation.updatedAt),
          messages: conversation.messages.map(message => ({
            ...message,
            createdAt: new Date(message.createdAt),
          })),
        }));
        setConversations(formattedConversations);

        // Set current conversation
        const storedCurrentId = localStorage.getItem("currentConversationId");
        if (storedCurrentId && formattedConversations.some(c => c.id === storedCurrentId)) {
          setCurrentConversationId(storedCurrentId);
        } else if (formattedConversations.length > 0) {
          setCurrentConversationId(formattedConversations[0].id);
        }
      } catch (error) {
        console.error("Failed to parse stored conversations:", error);
      }
    }
  }, []);

  // Save conversations to localStorage when they change
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations));
    }
    if (currentConversationId) {
      localStorage.setItem("currentConversationId", currentConversationId);
    }
  }, [conversations, currentConversationId]);

  const addConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "New conversation",
      messages: [
        {
          id: generateId(),
          role: "system",
          content: [{ type: "text", content: "How can I help you today?" }],
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    setConversations(prev => {
      // Mark all conversations as inactive and the new one as active
      return [...prev.map(c => ({ ...c, isActive: false })), newConversation];
    });
    setCurrentConversationId(newConversation.id);
  };

  const updateConversationTitle = (id: string, title: string) => {
    setConversations(prev =>
      prev.map(conversation =>
        conversation.id === id
          ? { ...conversation, title, updatedAt: new Date() }
          : conversation
      )
    );
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => {
      const updatedConversations = prev.filter(conversation => conversation.id !== id);

      // If we deleted the current conversation, select another one
      if (id === currentConversationId && updatedConversations.length > 0) {
        setCurrentConversationId(updatedConversations[0].id);
      } else if (updatedConversations.length === 0) {
        setCurrentConversationId(null);
        // Create a new conversation if we deleted the last one
        setTimeout(addConversation, 0);
      }

      return updatedConversations;
    });
  };

  const addMessage = (messageData: Omit<Message, "id" | "createdAt">) => {
    if (!currentConversationId) return;

    const newMessage: Message = {
      ...messageData,
      id: generateId(),
      createdAt: new Date(),
    };

    setConversations(prev =>
      prev.map(conversation => {
        if (conversation.id === currentConversationId) {
          const updatedConversation = {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            updatedAt: new Date(),
            title: conversation.messages.length === 1 ?
              truncateTitle(messageData.content[0]?.content || "New conversation") :
              conversation.title,
          };

          if (messageData.role === "user") {
            // Capture the current messages at this moment
            const baseMessages = [...conversation.messages, newMessage];

            setTimeout(() => {
              const pendingMessage: Message = {
                id: generateId(),
                role: "assistant",
                content: [{ type: "text", content: "" }],
                createdAt: new Date(),
                isPending: true,
              };

              // Append the pending message only once
              setConversations(current =>
                current.map(c =>
                  c.id === currentConversationId
                    ? {
                        ...c,
                        messages: [...c.messages, pendingMessage],
                        updatedAt: new Date(),
                      }
                    : c
                )
              );

              // Streaming fetch logic
              (async () => {
                try {
                  const res = await fetch("http://localhost:3001/api/chat", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      conversation: baseMessages.map(m => ({
                        role: m.role,
                        content: m.content,
                      })),
                    }),
                  });

                  if (!res.body) throw new Error("No response body");

                  const reader = res.body.getReader();
                  let fullContent = "";
                  let decoder = new TextDecoder();
                  let done = false;

                  while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;
                    if (value) {
                      const chunk = decoder.decode(value, { stream: true });
                      const lines = chunk.split(/\r?\n/).filter(Boolean);
                      for (const line of lines) {
                        if (line.startsWith("data:")) {
                          const jsonStr = line.replace(/^data:\s*/, "");
                          if (jsonStr === "[DONE]") continue;
                          try {
                            const data = JSON.parse(jsonStr);
                            if (typeof data.content === "string") {
                              fullContent += data.content;
                              // Only update the content of the existing pending message, not the array
                              setConversations(current =>
                                current.map(c =>
                                  c.id === currentConversationId
                                    ? {
                                        ...c,
                                        messages: c.messages.map(m =>
                                          m.id === pendingMessage.id
                                            ? {
                                                ...m,
                                                content: [
                                                  {
                                                    type: "text",
                                                    content: fullContent,
                                                  },
                                                ],
                                                // Don't change isPending here
                                              }
                                            : m
                                        ),
                                        updatedAt: new Date(),
                                      }
                                    : c
                                )
                              );
                            }
                          } catch (e) {
                            // ignore malformed lines
                          }
                        }
                      }
                    }
                  }

                  const parsedContent = parseContentParts(fullContent);

                  setConversations(current =>
                    current.map(c =>
                      c.id === currentConversationId
                        ? {
                            ...c,
                            messages: c.messages.map(m =>
                              m.id === pendingMessage.id
                                ? {
                                    ...m,
                                    content: parsedContent,
                                    isPending: false,
                                    isError: false,
                                  }
                                : m
                            ),
                            updatedAt: new Date(),
                          }
                        : c
                    )
                  );
                } catch (err) {
                  setConversations(current =>
                    current.map(c =>
                      c.id === currentConversationId
                        ? {
                            ...c,
                            messages: c.messages.map(m =>
                              m.id === pendingMessage.id
                                ? {
                                    ...m,
                                    content: [{ type: "text", content: "Failed to get response from server." }],
                                    isPending: false,
                                    isError: true,
                                  }
                                : m
                            ),
                            updatedAt: new Date(),
                          }
                        : c
                    )
                  );
                }
              })();
            }, 500);
          }

          return updatedConversation;
        }
        return conversation;
      })
    );
  };

  const updateMessage = (id: string, content: MessageContentPart[]) => {
    setConversations(prev =>
      prev.map(conversation => {
        if (conversation.id === currentConversationId) {
          return {
            ...conversation,
            messages: conversation.messages.map(message =>
              message.id === id
                ? { ...message, content, edited: true }
                : message
            ),
            updatedAt: new Date(),
          };
        }
        return conversation;
      })
    );
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversationId,
        setCurrentConversationId,
        addConversation,
        updateConversationTitle,
        deleteConversation,
        addMessage,
        updateMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
}

// Helper functions
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

// Parse the fullContent string into MessageContentPart[]
function parseContentParts(text: string): MessageContentPart[] {
  // Try to detect code, latex, markdown, or just text
  // Code block: ```lang\ncode\n```
  const parts: MessageContentPart[] = [];
  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.substring(lastIndex, match.index).trim();
      if (before) parts.push({ type: "text", content: before });
    }
    const language = match[1] || "text";
    const code = match[2].trim();
    parts.push({ type: "code", content: code, language });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex).trim();
    if (remaining) {
      // Try to detect latex ($$...$$ or \[...\])
      if (/^\$\$[\s\S]+\$\$$/.test(remaining) || /^\\\[[\s\S]+\\\]$/.test(remaining)) {
        parts.push({ type: "latex", content: remaining });
      } else if (/^# /.test(remaining)) {
        parts.push({ type: "markdown", content: remaining });
      } else {
        parts.push({ type: "text", content: remaining });
      }
    }
  }
  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }
  return parts;
}

function truncateTitle(text: string, maxLength = 30) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
