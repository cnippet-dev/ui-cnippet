//biome-ignore-all lint/style/noNonNullAssertion:<>

"use client";

import { useState } from "react";
import { SlidingNumber } from "@/registry/default/motion/sliding-number";

const presets = [
  { label: "Starter", price: 29, seats: 5 },
  { label: "Pro", price: 99, seats: 20 },
  { label: "Enterprise", price: 349, seats: 100 },
];

export default function SlidingNumberPricing() {
  const [active, setActive] = useState(0);
  const plan = presets[active]!;

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      <div className="flex gap-2">
        {presets.map((p, i) => (
          <button
            className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
              i === active
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={p.label}
            onClick={() => setActive(i)}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <div className="flex items-start justify-center gap-0.5">
          <span className="mt-2 font-semibold text-foreground text-xl">$</span>
          <span className="font-bold text-6xl text-foreground">
            <SlidingNumber value={plan.price} />
          </span>
          <span className="mt-4 text-muted-foreground text-sm">/mo</span>
        </div>
        <div className="mt-2 text-muted-foreground text-sm">
          Up to <SlidingNumber value={plan.seats} /> seats
        </div>
      </div>
    </div>
  );
}
