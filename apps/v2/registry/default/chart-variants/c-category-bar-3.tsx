"use client";

import { CategoryBar } from "@/registry/default/charts/category-bar";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Q4 marketing budget split; the marker shows spend so far.
const budget = [
  { name: "Paid search", value: 42000 },
  { name: "Events", value: 28000 },
  { name: "Content", value: 18000 },
  { name: "Sponsorships", value: 12000 },
];
const SPENT = 61500;

export default function BudgetAllocation() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-sm">Q4 marketing budget</span>
        <span className="text-muted-foreground text-sm tabular-nums">
          {formatCurrency(SPENT)} spent
        </span>
      </div>
      <CategoryBar
        className="mt-4"
        labels={budget.map((b) => b.name)}
        marker={SPENT}
        valueFormatter={(value) => formatCurrency(value)}
        values={budget.map((b) => b.value)}
      />
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground text-xs">
        {budget.map((b, i) => (
          <li className="flex items-center gap-1.5" key={b.name}>
            <span
              aria-hidden="true"
              className="size-2 rounded-xs"
              style={{ backgroundColor: `var(--chart-${i + 1})` }}
            />
            {b.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
