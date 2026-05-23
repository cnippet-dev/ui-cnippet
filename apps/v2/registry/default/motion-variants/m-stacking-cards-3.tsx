"use client";

import { useRef } from "react";
import {
  StackingCardItem,
  StackingCards,
} from "@/registry/default/motion/stacking-cards";

const steps = [
  {
    description: "Explore 164 animated components across 14 categories.",
    step: "01",
    title: "Browse",
  },
  {
    description: "Run npx cnippet@latest add <component> to add it.",
    step: "02",
    title: "Install",
  },
  {
    description: "Adjust props, variants, and Tailwind classes freely.",
    step: "03",
    title: "Customise",
  },
  {
    description: "Deploy production-ready animations with confidence.",
    step: "04",
    title: "Ship",
  },
];

export default function StackingCardsSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-56 overflow-y-auto px-6"
      ref={containerRef}
    >
      <StackingCards
        className="mx-auto h-[600px] w-full max-w-sm"
        scaleMultiplier={0.04}
        scrollOptions={{ container: containerRef }}
        totalCards={steps.length}
      >
        {steps.map((s, i) => (
          <StackingCardItem index={i} key={s.step} topPosition={`${i * 14}px`}>
            <div className="flex h-32 items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="text-3xl font-black text-primary/20">
                {s.step}
              </span>
              <div>
                <h3 className="font-bold text-foreground">{s.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </div>
  );
}
