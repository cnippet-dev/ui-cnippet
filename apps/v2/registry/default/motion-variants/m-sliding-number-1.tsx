"use client";

import { SlidingNumber } from "@/registry/default/motion/sliding-number";
import { useState } from "react";

export default function SlidingNumberCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="flex items-baseline gap-1 text-6xl font-bold tabular-nums text-foreground">
        <SlidingNumber value={count} />
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          type="button"
        >
          −
        </button>
        <button
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/80"
          onClick={() => setCount((c) => c + 1)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}
