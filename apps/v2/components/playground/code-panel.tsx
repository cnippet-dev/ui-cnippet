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
    <div className="flex flex-col border-border border-t">
      {/* Header */}
      <div className="flex items-center justify-between border-border border-b bg-frame px-4 py-1.5">
        <span className="font-mono text-[11px] text-faint">{label}</span>
        <button
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
      <div className="max-h-72 min-h-60 overflow-auto bg-frame">
        <pre className="p-4 font-mono text-[11px] text-foreground/80 leading-relaxed">
          <code>{source}</code>
        </pre>
      </div>
    </div>
  );
}
