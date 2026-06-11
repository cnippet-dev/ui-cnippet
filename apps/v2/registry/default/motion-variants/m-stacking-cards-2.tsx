"use client";

import { useRef } from "react";
import {
  StackingCardItem,
  StackingCards,
} from "@/registry/default/motion/stacking-cards";

const testimonials = [
  {
    name: "Alex Chen",
    quote:
      "The animation quality is exceptional. Dropped it into production in minutes.",
    role: "Frontend Engineer",
  },
  {
    name: "Maria Garcia",
    quote: "Finally, a component library that doesn't fight the design system.",
    role: "Product Designer",
  },
  {
    name: "James Kim",
    quote: "Copy-paste components with zero configuration. This is the future.",
    role: "Full-stack Developer",
  },
];

export default function StackingCardsTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-56 overflow-y-auto px-6" ref={containerRef}>
      <StackingCards
        className="mx-auto h-[500px] w-full max-w-sm"
        scaleMultiplier={0.05}
        scrollOptions={{ container: containerRef }}
        totalCards={testimonials.length}
      >
        {testimonials.map((t, i) => (
          <StackingCardItem index={i} key={t.name} topPosition={`${i * 14}px`}>
            <div className="flex h-44 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-muted-foreground text-sm italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {t.name}
                </p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </div>
  );
}
