"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SunburstChart } from "@/registry/default/charts/sunburst-chart";

// Headcount by department and team.
const data = [
  {
    children: [
      { name: "Platform", value: 18 },
      { name: "Product", value: 26 },
      { name: "Mobile", value: 12 },
      { name: "Data", value: 8 },
    ],
    name: "Engineering",
  },
  {
    children: [
      { name: "Account execs", value: 17 },
      { name: "SDRs", value: 14 },
    ],
    name: "Sales",
  },
  {
    children: [
      { name: "Support", value: 15 },
      { name: "Onboarding", value: 7 },
    ],
    name: "Customer success",
  },
  {
    children: [
      { name: "Brand", value: 6 },
      { name: "Growth", value: 8 },
    ],
    name: "Marketing",
  },
];

export default function OrgStructure() {
  return (
    <ChartCard
      className="max-w-sm"
      description="131 people, department → team"
      title="Org structure"
    >
      <SunburstChart
        className="h-64"
        data={data}
        valueFormatter={(value) => `${value} people`}
      />
    </ChartCard>
  );
}
