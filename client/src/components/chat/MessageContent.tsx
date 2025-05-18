"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { MessageContentPart } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface MessageContentProps {
  content: MessageContentPart[];
}

export function MessageContent({ content }: MessageContentProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="space-y-4">
      {content.map((part, index) => (
        <ContentPartRenderer
          key={`${part.type}-${index}`}
          part={part}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
}

interface MessageContentPartProps {
  part: MessageContentPart;
  isDarkTheme: boolean;
}

// Define type for the code component props in ReactMarkdown
interface CodeProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function ContentPartRenderer({ part, isDarkTheme }: MessageContentPartProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  switch (part.type) {
    case "text":
      return (
        <div className="whitespace-pre-wrap">{part.content}</div>
      );

    case "code":
      return (
        <div className="relative rounded-md overflow-hidden">
          <div className="absolute right-2 top-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-slate-800/60 text-slate-50 hover:bg-slate-700 hover:text-slate-50"
              onClick={() => handleCopy(part.content)}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <div className="text-xs font-mono bg-slate-800 text-slate-200 py-1 px-4">
            {part.language || "code"}
          </div>
          <SyntaxHighlighter
            language={part.language || "javascript"}
            style={isDarkTheme ? oneDark : oneLight}
            customStyle={{ margin: 0 }}
            showLineNumbers
          >
            {part.content}
          </SyntaxHighlighter>
        </div>
      );

    case "latex":
      return (
        <div className="py-2">
          {part.content.includes("\\begin{") || part.content.includes("\\[") ? (
            <BlockMath math={part.content} />
          ) : (
            <InlineMath math={part.content} />
          )}
        </div>
      );

    case "markdown":
      return (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code: ({ node, inline, className, children, ...props }: CodeProps) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'text';

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <div className="relative rounded-md overflow-hidden my-4">
                    <div className="absolute right-2 top-2 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-slate-800/60 text-slate-50 hover:bg-slate-700 hover:text-slate-50"
                        onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                    <div className="text-xs font-mono bg-slate-800 text-slate-200 py-1 px-4">
                      {language}
                    </div>
                    <SyntaxHighlighter
                      language={language}
                      style={isDarkTheme ? oneDark : oneLight}
                      customStyle={{ margin: 0 }}
                      showLineNumbers={!inline && language !== 'text'}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                );
              }
            }}
          >
            {part.content}
          </ReactMarkdown>
        </div>
      );

    default:
      return null;
  }
}
