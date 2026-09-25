"use client";

import { useTheme } from "@cnippet/ui/shared/theme-provider";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground",
        className,
      )}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      type="button"
    >
      <Sun className="size-4 transition-all duration-250 ease-out-expo dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-250 ease-out-expo dark:rotate-0 dark:scale-100" />
    </button>
  );
}
