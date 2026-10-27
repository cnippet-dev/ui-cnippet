"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { DonutChart } from "@/registry/default/charts/donut-chart";

const data = [
  { department: "Engineering", people: 64 },
  { department: "Sales", people: 31 },
  { department: "Customer success", people: 22 },
  { department: "Marketing", people: 14 },
  { department: "Operations", people: 11 },
];

export default function TeamByDepartment() {
  return (
    <ChartCard
      className="max-w-md"
      description="142 people across five departments"
      title="Headcount"
    >
      <DonutChart
        category="people"
        className="h-60"
        data={data}
        index="department"
        showLabels
        valueFormatter={(value) => `${value} people`}
      />
    </ChartCard>
  );
}
