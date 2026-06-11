"use client";

import { RiCheckLine, RiClipboardLine } from "@remixicon/react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodePanelProps {
  source: string;
  label: string;
}

export function CodePanel({ source, label }: CodePanelProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  if (!source) return null;

  return (
    <div className="flex flex-col border-gray-950/8 border-t dark:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between border-gray-950/8 border-b bg-gray-950/2 px-4 py-1.5 dark:border-white/10 dark:bg-white/3">
        <span className="font-mono text-[11px] text-gray-950/40 dark:text-white/30">
          {label}
        </span>
        <button
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-gray-950/50 transition-colors hover:bg-gray-950/5 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/8 dark:hover:text-white/70"
          onClick={() => copyToClipboard(source)}
          type="button"
        >
          {isCopied ? (
            <>
              <RiCheckLine className="size-3" />
              Copied
            </>
          ) : (
            <>
              <RiClipboardLine className="size-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="max-h-72 min-h-60 overflow-auto bg-gray-950/2 dark:bg-white/2">
        <pre className="p-4 font-mono text-[11px] text-gray-950/80 leading-relaxed dark:text-white/70">
          <code>{source}</code>
        </pre>
      </div>
    </div>
  );
}
