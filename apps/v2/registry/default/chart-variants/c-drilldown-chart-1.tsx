"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import {
  DrilldownChart,
  type DrilldownNode,
} from "@/registry/default/charts/drilldown-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const quarter = (name: string, months: [string, number][]): DrilldownNode => ({
  children: months.map(([m, value]) => ({ name: m, value })),
  name,
  value: months.reduce((sum, [, v]) => sum + v, 0),
});

// Year → quarter → month.
const data: DrilldownNode[] = [
  {
    children: [
      quarter("Q1", [
        ["Jan", 31200],
        ["Feb", 33850],
        ["Mar", 36400],
      ]),
      quarter("Q2", [
        ["Apr", 38900],
        ["May", 42900],
        ["Jun", 41700],
      ]),
      quarter("Q3", [
        ["Jul", 44100],
        ["Aug", 46800],
        ["Sep", 48200],
      ]),
      quarter("Q4", [
        ["Oct", 51300],
        ["Nov", 54900],
        ["Dec", 58100],
      ]),
    ],
    name: "2025",
    value: 0,
  },
  {
    children: [
      quarter("Q1", [
        ["Jan", 55200],
        ["Feb", 57400],
        ["Mar", 60100],
      ]),
      quarter("Q2", [
        ["Apr", 62800],
        ["May", 64300],
        ["Jun", 66900],
      ]),
      quarter("Q3", [
        ["Jul", 69400],
        ["Aug", 71200],
        ["Sep", 73800],
      ]),
    ],
    name: "2026",
    value: 0,
  },
];
for (const year of data) {
  year.value = year.children?.reduce((sum, q) => sum + q.value, 0) ?? 0;
}

export default function RevenueDrilldown() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Click a bar to see its breakdown"
      title="Revenue"
    >
      <DrilldownChart
        className="h-52"
        data={data}
        rootLabel="All years"
        valueFormatter={formatCurrency}
        valueLabel="Revenue"
      />
    </ChartCard>
  );
}
