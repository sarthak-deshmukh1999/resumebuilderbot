# Latex Resume-Builder

A Resume-Builder user interface built with Next.js and shadcn/ui.

## Features

- **Modern UI**: Clean, responsive interface based on the latest design
- **Multi-Format Support**: Handles various content formats including:
  - Code blocks with syntax highlighting
  - LaTeX mathematical expressions
  - Markdown formatting
  - Plain text
- **Conversation Management**: Create, switch between, and delete conversations
- **Message Threading**: View and manage message threads
- **Dark/Light Mode**: Toggle between dark and light themes
- **Mobile Responsive**: Fully optimized for all device sizes
- **Local Storage**: Conversations are saved to browser localStorage
- **Mock AI Responses**: Simulated AI responses to demonstrate functionality

## Technologies Used

- **Next.js**: React framework for the frontend
- **TypeScript**: For type safety
- **shadcn/ui**: UI component library built on Radix UI
- **TailwindCSS**: For styling
- **React Syntax Highlighter**: For code syntax highlighting
- **React KaTeX**: For rendering LaTeX expressions
- **React Markdown**: For rendering markdown content

## Getting Started

### Prerequisites

- Node.js 16+
- Bun (recommended) or npm

### Installation

1. Clone the repository:
   ```
   git clone git@github.com:sarthak-deshmukh1999/resumebuilderbot.git
   ```

2. Navigate to the project directory:
   ```
   cd resume-builder
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/components/chat`: Chat UI components
- `src/context`: React context providers for state management
- `src/lib`: Utility functions and mock data
- `src/types`: TypeScript type definitions
- `src/app`: Next.js app routes

## License

MIT