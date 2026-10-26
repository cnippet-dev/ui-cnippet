"use client";

import { CategoryBar } from "@/registry/default/charts/category-bar";

// Storage used, in GB, out of a 256 GB plan.
const usage = [
  { name: "Photos", value: 94 },
  { name: "Video", value: 61 },
  { name: "Documents", value: 23 },
  { name: "Backups", value: 38 },
];
const PLAN = 256;
const used = usage.reduce((sum, u) => sum + u.value, 0);

export default function StorageBreakdown() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-sm">Storage</span>
        <span className="text-muted-foreground text-sm tabular-nums">
          {used} GB of {PLAN} GB
        </span>
      </div>
      <CategoryBar
        className="mt-3"
        colors={[
          "var(--chart-1)",
          "var(--chart-2)",
          "var(--chart-3)",
          "var(--chart-4)",
          "var(--muted)",
        ]}
        labels={[...usage.map((u) => u.name), "Free"]}
        showLabels={false}
        valueFormatter={(value) => `${value} GB`}
        values={[...usage.map((u) => u.value), PLAN - used]}
      />
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {usage.map((u, i) => (
          <li className="flex items-center gap-2" key={u.name}>
            <span
              aria-hidden="true"
              className="size-2 rounded-xs"
              style={{ backgroundColor: `var(--chart-${i + 1})` }}
            />
            <span className="flex-1">{u.name}</span>
            <span className="text-muted-foreground tabular-nums">
              {u.value} GB
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
