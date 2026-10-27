"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SunburstChart } from "@/registry/default/charts/sunburst-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  {
    children: [
      { name: "United States", value: 412000 },
      { name: "Canada", value: 68000 },
      { name: "Mexico", value: 31000 },
    ],
    name: "Americas",
  },
  {
    children: [
      { name: "Germany", value: 142000 },
      { name: "United Kingdom", value: 118000 },
      { name: "France", value: 74000 },
    ],
    name: "EMEA",
  },
  {
    children: [
      { name: "Japan", value: 96000 },
      { name: "Australia", value: 58000 },
      { name: "India", value: 41000 },
    ],
    name: "APAC",
  },
];

export default function RevenueByRegion() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Q3 revenue, region → country"
      title="Revenue by region"
    >
      <SunburstChart
        className="h-64"
        data={data}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
