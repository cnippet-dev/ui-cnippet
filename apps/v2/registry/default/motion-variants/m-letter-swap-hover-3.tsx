"use client";

import { LetterSwapHover } from "@/registry/default/motion/letter-swap-hover";

const items = [
  { label: "Components", count: "164" },
  { label: "Downloads", count: "98K" },
  { label: "Stars", count: "4.2K" },
];

export default function LetterSwapHoverStats() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex divide-x divide-border">
        {items.map((item) => (
          <div className="px-8 text-center first:pl-0 last:pr-0" key={item.label}>
            <p className="text-3xl font-bold tabular-nums text-foreground">
              {item.count}
            </p>
            <LetterSwapHover
              className="mt-1 cursor-default text-xs text-muted-foreground"
              label={item.label}
              staggerFrom="center"
              staggerDuration={0.035}
              transition={{ duration: 0.6, type: "spring" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
