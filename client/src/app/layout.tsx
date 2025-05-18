import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Resume Builder Bot",
  description: "A Resume Builder Bot with modern features",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster position="top-center" closeButton />
        </Providers>
      </body>
    </html>
  );
}
