"use client";

import * as React from "react";
import { ThemeContextProps, ThemeProviderProps } from "@/types";

const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<string>(defaultTheme);

  // Initialize theme from localStorage if available
  React.useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme class
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: string) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, theme);
        }
        setTheme(theme);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
