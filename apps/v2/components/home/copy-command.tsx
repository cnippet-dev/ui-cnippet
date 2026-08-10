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
        "group flex w-full items-center gap-3 border border-dashed bg-background-100 px-4 py-3 text-left font-mono text-[13px] transition-colors hover:border-cnippet-accent dark:bg-background-200",
        className,
      )}
      onClick={copy}
      type="button"
    >
      <span aria-hidden="true" className="select-none text-cnippet-accent">
        $
      </span>
      <span className="truncate text-foreground">{command}</span>
      <span
        aria-hidden="true"
        className="ml-auto text-muted-foreground transition-colors group-hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5 text-cnippet-green" />
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
