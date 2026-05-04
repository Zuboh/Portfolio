"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      themes={["light", "dark", "panda"]}
      defaultTheme="system"
      enableSystem={true}
    >
      {children}
    </ThemeProvider>
  );
}
