"use client";

import { TextGradient } from "@/registry/default/motion/text-gradient";

const tiers = [
  {
    colors: ["#a855f7", "#ec4899", "#a855f7"],
    duration: 4,
    label: "Pro",
    price: "$12",
  },
  {
    colors: ["#3b82f6", "#06b6d4", "#3b82f6"],
    duration: 5,
    label: "Team",
    price: "$49",
  },
  {
    colors: ["#f97316", "#eab308", "#f97316"],
    duration: 6,
    label: "Enterprise",
    price: "$199",
  },
];

export default function TextGradientPricing() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex gap-6">
        {tiers.map((tier) => (
          <div
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-5 text-center"
            key={tier.label}
          >
            <TextGradient
              as="p"
              className="font-bold text-3xl"
              colors={tier.colors}
              duration={tier.duration}
            >
              {tier.price}
            </TextGradient>
            <p className="text-muted-foreground text-xs">{tier.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
