"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  className?: string;
  command: string;
};

/**
 * A terminal-styled command that copies itself. Used in the hero and the
 * install section — the one thing a developer should be able to take from the
 * page without reading anything else.
 */
export function CopyCommand({ className, command }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Clipboard is unavailable (insecure context / denied) — leave the label
      // untouched rather than claiming a copy that never happened.
      return;
    }

    setCopied(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      className={cn(
        "group flex h-10 w-full min-w-0 items-center gap-3 rounded-xl border bg-frame ps-3.5 pe-1.5 text-left font-mono text-[13px] outline-none transition-colors duration-150 hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      onClick={copy}
      type="button"
    >
      <span aria-hidden="true" className="select-none text-signal">
        $
      </span>
      {/* Clip from the start on narrow screens so the package name — the
          part that matters — stays visible: "…add @cnippet/button". */}
      <span className="truncate text-left text-foreground [direction:rtl]">
        <bdi>{command}</bdi>
      </span>
      <span
        aria-hidden="true"
        className="ms-auto inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 group-hover:bg-background group-hover:text-foreground group-hover:shadow-xs/5"
      >
        {copied ? (
          <Check className="size-3.5 text-success-foreground" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </span>
      <span className="sr-only">
        {copied ? "Copied to clipboard" : `Copy: ${command}`}
      </span>
    </button>
  );
}
