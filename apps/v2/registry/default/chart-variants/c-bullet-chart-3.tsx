"use client";

import { BulletChart } from "@/registry/default/charts/bullet-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Monthly cloud spend: bands at 50% / 80% / 100% of budget, target = forecast.
const lines = [
  { budget: 18000, forecast: 16500, name: "Compute", spent: 11200 },
  { budget: 6000, forecast: 6800, name: "Storage", spent: 4900 },
  { budget: 4000, forecast: 2600, name: "Networking", spent: 1700 },
];

export default function BudgetUsage() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">October cloud spend</div>
      <div className="text-muted-foreground text-xs">
        Bar = spent so far · marker = month-end forecast
      </div>
      <ul className="mt-4 grid gap-5">
        {lines.map((l) => (
          <li className="grid gap-1.5" key={l.name}>
            <div className="flex justify-between text-sm">
              <span>{l.name}</span>
              <span className="text-muted-foreground tabular-nums">
                {formatCurrency(l.spent)} of {formatCurrency(l.budget)}
              </span>
            </div>
            <BulletChart
              color={
                l.forecast > l.budget ? "var(--warning)" : "var(--chart-1)"
              }
              max={Math.max(l.budget, l.forecast) * 1.05}
              ranges={[l.budget * 0.5, l.budget * 0.8, l.budget]}
              target={l.forecast}
              value={l.spent}
              valueFormatter={formatCurrency}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
