"use client";

import { useState } from "react";
import { Textarea } from "@/registry/default/ui/textarea";

export function Pattern() {
  const [value, setValue] = useState("");
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="w-full max-w-xs">
      <Textarea
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start writing. The field grows as you type…"
        value={value}
      />
      <div className="mt-1.5 flex items-center justify-between text-muted-foreground text-xs">
        <span>
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
        <span>{charCount} chars</span>
      </div>
    </div>
  );
}
