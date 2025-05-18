// This file is now unused for chat responses. You may delete or keep for testing.
import type { MessageContentPart } from "@/types";

// Sample responses for different formats
const codeExamples = [
  {
    language: "javascript",
    content: `function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120`,
  },
  {
    language: "python",
    content: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3, 6, 8, 10, 1, 2, 1]))`,
  },
  {
    language: "typescript",
    content: `interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};`,
  },
  {
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a sample HTML page.</p>
</body>
</html>`,
  },
  {
    language: "css",
    content: `.container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}`,
  },
];

const latexExamples = [
  `E = mc^2`,
  `\\frac{n!}{k!(n-k)!} = \\binom{n}{k}`,
  `\\int_a^b f(x) \\, dx = F(b) - F(a)`,
  `\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}`,
  `P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)}`,
];

const markdownExamples = [
  `# Heading 1
## Heading 2
### Heading 3

- List item 1
- List item 2
- List item 3

**Bold text** and *italic text* and ~~strikethrough~~

> This is a blockquote

[Link to Google](https://www.google.com)`,
  `# Quick Reference Guide

## Installation
\`\`\`bash
npm install my-awesome-package
\`\`\`

## Usage
\`\`\`javascript
import { myFunction } from 'my-awesome-package';

const result = myFunction();
console.log(result);
\`\`\`

## API

| Method | Description |
|--------|-------------|
| \`methodA()\` | Does something amazing |
| \`methodB()\` | Does something even better |
`,
  `# Project Overview

![Project Logo](https://example.com/logo.png)

## Features

- **Fast**: Optimized for speed
- **Secure**: Built with security in mind
- **Scalable**: Grows with your needs

> "This project changed everything" — Happy User

Try our [online demo](https://example.com/demo)!
`,
];

const textResponses = [
  "I'd be happy to help you with that! Let me break this down step by step...",
  "That's an interesting question. There are several approaches we can take here...",
  "Based on your request, I recommend the following solution...",
  "Great question! Here's what you need to know about this topic...",
  "I understand what you're asking for. Let me provide a comprehensive response...",
];

// Function to determine the type of user query and generate an appropriate response
export function generateMockResponse(
  userContent: MessageContentPart[]
): MessageContentPart[] {
  const userQuery = userContent[0]?.content.toLowerCase() || "";
  const response: MessageContentPart[] = [];

  // Determine if the query is related to code
  const codeRelatedTerms = [
    "code",
    "function",
    "programming",
    "javascript",
    "python",
    "typescript",
    "react",
    "html",
    "css",
  ];
  const isCodeRelated = codeRelatedTerms.some((term) =>
    userQuery.includes(term)
  );

  // Determine if the query is related to math/LaTeX
  const mathRelatedTerms = [
    "math",
    "equation",
    "formula",
    "calculus",
    "algebra",
    "latex",
    "integral",
    "derivative",
  ];
  const isMathRelated = mathRelatedTerms.some((term) =>
    userQuery.includes(term)
  );

  // Add a text part
  response.push({
    type: "text",
    content: textResponses[Math.floor(Math.random() * textResponses.length)],
  });

  // Add code example(s) if query is code-related
  if (isCodeRelated || Math.random() < 0.3) {
    const codeExample =
      codeExamples[Math.floor(Math.random() * codeExamples.length)];
    response.push({
      type: "code",
      content: codeExample.content,
      language: codeExample.language,
    });
  }

  // Add LaTeX if query is math-related
  if (isMathRelated || Math.random() < 0.2) {
    response.push({
      type: "latex",
      content:
        latexExamples[Math.floor(Math.random() * latexExamples.length)],
    });
  }

  // Add Markdown for some responses
  if (Math.random() < 0.25) {
    response.push({
      type: "markdown",
      content:
        markdownExamples[Math.floor(Math.random() * markdownExamples.length)],
    });
  }

  // Add a concluding text part for longer responses
  if (response.length > 1) {
    response.push({
      type: "text",
      content:
        "I hope this helps! Let me know if you need any clarification or have further questions.",
    });
  }

  return response;
}
