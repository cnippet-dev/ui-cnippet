"use client";

import { LetterSwapHover } from "@/registry/default/motion/letter-swap-hover";

const items = [
  { count: "164", label: "Components" },
  { count: "98K", label: "Downloads" },
  { count: "4.2K", label: "Stars" },
];

export default function LetterSwapHoverStats() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex divide-x divide-border">
        {items.map((item) => (
          <div
            className="px-8 text-center first:pl-0 last:pr-0"
            key={item.label}
          >
            <p className="font-bold text-3xl text-foreground tabular-nums">
              {item.count}
            </p>
            <LetterSwapHover
              className="mt-1 cursor-default text-muted-foreground text-xs"
              label={item.label}
              staggerDuration={0.035}
              staggerFrom="center"
              transition={{ duration: 0.6, type: "spring" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
