"use client";

import { CategoryBar } from "@/registry/default/charts/category-bar";

const SCORE = 712;

export default function CreditScore() {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-card p-5">
      <div className="text-muted-foreground text-sm">Credit score</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-semibold text-3xl tabular-nums">{SCORE}</span>
        <span className="text-sm text-success-foreground">Good</span>
      </div>
      {/* Bands start at 300: poor 300–580, fair –670, good –740, excellent –850. */}
      <CategoryBar
        className="mt-5"
        colors={[
          "var(--destructive)",
          "var(--warning)",
          "var(--success)",
          "var(--info)",
        ]}
        labels={["Poor", "Fair", "Good", "Excellent"]}
        marker={SCORE - 300}
        valueFormatter={(value) => String(value + 300)}
        values={[280, 90, 70, 110]}
      />
    </div>
  );
}
