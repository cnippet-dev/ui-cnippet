"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ComboChart } from "@/registry/default/charts/combo-chart";
import {
  formatCompact,
  formatCurrency,
} from "@/registry/default/lib/chart-utils";

// Orders rise into the holidays while average order value dips with discounts.
const data = [
  { aov: 84.2, orders: 3120, week: "Nov 3" },
  { aov: 82.9, orders: 3480, week: "Nov 10" },
  { aov: 81.4, orders: 3910, week: "Nov 17" },
  { aov: 72.6, orders: 6840, week: "Nov 24" },
  { aov: 76.1, orders: 5210, week: "Dec 1" },
  { aov: 78.8, orders: 4870, week: "Dec 8" },
  { aov: 80.5, orders: 4420, week: "Dec 15" },
];

export default function OrdersAndAov() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Weekly orders and average order value through the holidays"
      title="Orders & AOV"
    >
      <ComboChart
        barCategories={["orders"]}
        className="h-48"
        config={{
          aov: { color: "var(--chart-1)", label: "Avg. order value" },
          orders: { color: "var(--chart-2)", label: "Orders" },
        }}
        data={data}
        dualAxis
        index="week"
        lineCategories={["aov"]}
        lineValueFormatter={(value) =>
          formatCurrency(value, "USD", { compact: false })
        }
        valueFormatter={formatCompact}
        yAxisWidth={64}
      />
    </ChartCard>
  );
}
