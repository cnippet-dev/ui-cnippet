"use client";

import { useState } from "react";
import { TextMorph } from "@/registry/default/motion/text-morph";

const suggestions = ["Search docs", "Search components", "Search examples"];

export default function TextMorphSearch() {
  const [query, setQuery] = useState("");
  const placeholder =
    suggestions[query.length % suggestions.length] ?? suggestions[0];

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          className="h-10 w-full rounded-lg border border-border bg-background pr-4 pl-9 text-foreground text-sm outline-none placeholder:text-transparent focus:ring-2 focus:ring-ring"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          value={query}
        />
        {!query && (
          <div className="pointer-events-none absolute inset-y-0 left-9 flex items-center">
            <TextMorph className="text-muted-foreground text-sm">
              {placeholder ?? ""}
            </TextMorph>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-xs">
        Placeholder morphs as you type
      </p>
    </div>
  );
}
