"use client";

import type { PlaygroundMode } from "@/lib/playground/types";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: PlaygroundMode;
  onChange: (mode: PlaygroundMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-950/5 p-0.5 dark:bg-white/8">
      {(["inspect", "build"] as PlaygroundMode[]).map((m) => (
        <button
          className={cn(
            "rounded-md px-3 py-0.5 font-mono text-[11px] tracking-tight transition-colors",
            mode === m
              ? "bg-white text-gray-950 shadow-xs dark:bg-neutral-700 dark:text-white"
              : "text-gray-950/50 hover:text-gray-950/80 dark:text-white/40 dark:hover:text-white/70",
          )}
          key={m}
          onClick={() => onChange(m)}
          type="button"
        >
          {m}
        </button>
      ))}
    </div>
  );
}
