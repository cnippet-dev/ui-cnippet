"use client";

import { CodeIcon, LinkIcon, QuoteIcon, StrikethroughIcon } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

const tools = [
  { icon: StrikethroughIcon, id: "strike", label: "Strikethrough" },
  { icon: CodeIcon, id: "code", label: "Inline code" },
  { icon: QuoteIcon, id: "quote", label: "Blockquote" },
  { icon: LinkIcon, id: "link", label: "Link" },
];

export function Pattern() {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const preview = () => {
    let text = "The quick brown fox";
    if (active.has("strike")) text = `~~${text}~~`;
    if (active.has("code")) text = `\`${text}\``;
    if (active.has("quote")) text = `> ${text}`;
    if (active.has("link")) text = `[${text}](https://example.com)`;
    return text || "The quick brown fox";
  };

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center gap-1 rounded-lg border border-input bg-muted/30 p-1">
        {tools.map(({ icon: Icon, id, label }) => (
          <Toggle
            aria-label={label}
            key={id}
            onPressedChange={() => toggle(id)}
            pressed={active.has(id)}
            size="sm"
          >
            <Icon className="size-3.5" />
          </Toggle>
        ))}
      </div>
      <div className="rounded-lg border border-input bg-background px-3 py-2 font-mono text-foreground/80 text-sm">
        {preview()}
      </div>
      <p className="text-center text-muted-foreground text-xs">
        {active.size > 0
          ? `Active: ${[...active].join(", ")}`
          : "No formatting applied"}
      </p>
    </div>
  );
}
