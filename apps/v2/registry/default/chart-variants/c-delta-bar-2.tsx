"use client";

import { DeltaBar } from "@/registry/default/charts/delta-bar";
import {
  formatCurrency,
  formatPercent,
} from "@/registry/default/lib/chart-utils";

// Actual spend vs budget per team. Over budget is bad, so invertDelta.
const teams = [
  { actual: 128400, budget: 120000, name: "Engineering" },
  { actual: 41200, budget: 48000, name: "Marketing" },
  { actual: 22900, budget: 22000, name: "Sales" },
  { actual: 9800, budget: 14000, name: "Design" },
];

export default function BudgetVariance() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">Budget variance, Q3</div>
      <ul className="mt-4 grid gap-4">
        {teams.map((t) => {
          const variance = (t.actual - t.budget) / t.budget;
          return (
            <li className="grid gap-1.5" key={t.name}>
              <div className="flex justify-between text-sm">
                <span>{t.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatCurrency(t.actual)} / {formatCurrency(t.budget)}
                </span>
              </div>
              <DeltaBar
                aria-label={`${t.name}: ${formatPercent(variance, { signed: true })} vs budget`}
                invertDelta
                value={variance}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
