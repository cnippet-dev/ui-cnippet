"use client";

import { RandomLetterSwap } from "@/registry/default/motion/random-letter-swap";

const tags = ["motion", "react", "tailwind", "typescript", "open-source"];

export default function RandomLetterSwapTags() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      <p className="text-sm text-muted-foreground">Hover a tag</p>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <div
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium"
            key={tag}
          >
            <RandomLetterSwap
              className="text-foreground"
              label={tag}
              staggerDuration={0.018}
              transition={{ duration: 0.55, type: "spring" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
