"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "@/registry/default/motion/text-morph";

const plans = ["Starter", "Pro", "Enterprise"];

export default function TextMorphPricing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % plans.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-xs rounded-xl border border-border bg-card p-6 text-center">
        <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-widest">
          Current plan
        </p>
        <TextMorph
          as="h3"
          className="font-bold text-3xl text-foreground"
          transition={{
            damping: 20,
            mass: 0.25,
            stiffness: 320,
            type: "spring",
          }}
        >
          {plans[index] ?? plans[0] ?? ""}
        </TextMorph>
        <p className="mt-3 text-muted-foreground text-sm">
          Upgrade or downgrade at any time.
        </p>
      </div>
    </div>
  );
}
