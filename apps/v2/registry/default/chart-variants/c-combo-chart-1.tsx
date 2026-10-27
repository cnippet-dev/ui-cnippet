"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ComboChart } from "@/registry/default/charts/combo-chart";
import {
  formatCurrency,
  formatPercent,
} from "@/registry/default/lib/chart-utils";

// Growth is month-over-month change in revenue.
const data = [
  { growth: 0.021, month: "Jan", revenue: 41200 },
  { growth: -0.056, month: "Feb", revenue: 38900 },
  { growth: 0.172, month: "Mar", revenue: 45600 },
  { growth: 0.033, month: "Apr", revenue: 47100 },
  { growth: 0.11, month: "May", revenue: 52300 },
  { growth: -0.048, month: "Jun", revenue: 49800 },
  { growth: 0.112, month: "Jul", revenue: 55400 },
  { growth: 0.063, month: "Aug", revenue: 58900 },
];

export default function RevenueAndGrowth() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Monthly revenue with month-over-month growth"
      title="Revenue & growth"
    >
      <ComboChart
        barCategories={["revenue"]}
        className="h-48"
        config={{ growth: { label: "MoM growth" } }}
        data={data}
        dualAxis
        index="month"
        lineCategories={["growth"]}
        lineValueFormatter={(value) => formatPercent(value, { digits: 0 })}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
