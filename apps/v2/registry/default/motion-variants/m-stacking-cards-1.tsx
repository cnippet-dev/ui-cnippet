"use client";

import { useRef } from "react";
import {
  StackingCardItem,
  StackingCards,
} from "@/registry/default/motion/stacking-cards";

const features = [
  {
    bg: "bg-violet-500/10",
    description: "Optimized for 60fps with zero layout thrashing.",
    icon: "⚡",
    title: "Blazing Fast",
  },
  {
    bg: "bg-emerald-500/10",
    description: "Ships with ARIA attributes and reduced-motion support.",
    icon: "♿",
    title: "Accessible",
  },
  {
    bg: "bg-sky-500/10",
    description: "Stack any content — cards, text, media — whatever you need.",
    icon: "🧩",
    title: "Composable",
  },
];

export default function StackingCardsFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-56 overflow-y-auto px-6"
      ref={containerRef}
    >
      <StackingCards
        className="mx-auto h-[500px] w-full max-w-sm"
        scaleMultiplier={0.05}
        scrollOptions={{ container: containerRef }}
        totalCards={features.length}
      >
        {features.map((f, i) => (
          <StackingCardItem index={i} key={f.title} topPosition={`${i * 14}px`}>
            <div
              className={`flex h-44 flex-col justify-between rounded-2xl border border-border ${f.bg} p-5`}
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="font-bold text-foreground">{f.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </div>
  );
}
