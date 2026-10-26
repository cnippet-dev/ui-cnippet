"use client";

import { BarChart } from "@/registry/default/charts/bar-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { month: "Jan", revenue: 41200 },
  { month: "Feb", revenue: 38900 },
  { month: "Mar", revenue: 45600 },
  { month: "Apr", revenue: 47100 },
  { month: "May", revenue: 52300 },
  { month: "Jun", revenue: 49800 },
  { month: "Jul", revenue: 55400 },
  { month: "Aug", revenue: 58900 },
];

export default function MonthlyRevenue() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.064}
      description="Net revenue per month, 2026"
      title="Revenue"
      value={formatCurrency(58900)}
    >
      <BarChart
        categories={["revenue"]}
        className="h-48"
        data={data}
        index="month"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
