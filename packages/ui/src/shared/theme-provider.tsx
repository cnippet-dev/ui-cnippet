"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes";
import type * as React from "react";

export { useTheme };

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
