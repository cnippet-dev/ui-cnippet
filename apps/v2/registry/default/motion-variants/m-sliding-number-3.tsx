"use client";

import { SlidingNumber } from "@/registry/default/motion/sliding-number";
import { useState } from "react";

const presets = [
  { label: "Starter", seats: 5, price: 29 },
  { label: "Pro", seats: 20, price: 99 },
  { label: "Enterprise", seats: 100, price: 349 },
];

export default function SlidingNumberPricing() {
  const [active, setActive] = useState(0);
  const plan = presets[active]!;

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      <div className="flex gap-2">
        {presets.map((p, i) => (
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
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
          <span className="mt-2 text-xl font-semibold text-foreground">$</span>
          <span className="text-6xl font-bold text-foreground">
            <SlidingNumber value={plan.price} />
          </span>
          <span className="mt-4 text-sm text-muted-foreground">/mo</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Up to <SlidingNumber value={plan.seats} /> seats
        </p>
      </div>
    </div>
  );
}
