export type Role = 'user' | 'assistant' | 'system';

export type MessageFormatType = 'text' | 'code' | 'latex' | 'markdown';

export interface MessageContentPart {
  type: MessageFormatType;
  content: string;
  language?: string; // For code blocks
}

export interface Message {
  id: string;
  role: Role;
  content: MessageContentPart[];
  createdAt: Date;
  isPending?: boolean;
  isError?: boolean;
  parentMessageId?: string | null; // For threading support
  edited?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface ConversationContextProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  addConversation: () => void;
  updateConversationTitle: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updateMessage: (id: string, content: MessageContentPart[]) => void;
}

export interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string) => void;
  deleteConversation: (id: string) => void;
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface MessageProps {
  message: Message;
  isLastMessage?: boolean;
  onEdit?: (id: string, content: MessageContentPart[]) => void;
}

export interface MessageListProps {
  messages: Message[];
  onEditMessage?: (id: string, content: MessageContentPart[]) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}
