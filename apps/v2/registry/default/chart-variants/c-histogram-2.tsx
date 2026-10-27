"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Histogram } from "@/registry/default/charts/histogram";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Deterministic order values clustered around $45 and $120.
const orders = Array.from({ length: 400 }, (_, i) => {
  const wobble = ((i * 37) % 41) - 20;
  return i % 3 === 0 ? 120 + wobble * 1.8 : 45 + wobble;
});

export default function OrderValues() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Value of 400 orders placed in October"
      title="Order value"
      value={`${formatCurrency(66.4, "USD", { compact: false })} avg`}
    >
      <Histogram
        bins={10}
        className="h-48"
        color="var(--chart-2)"
        label="Orders"
        valueFormatter={(v) => `$${Math.round(v)}`}
        values={orders}
      />
    </ChartCard>
  );
}
