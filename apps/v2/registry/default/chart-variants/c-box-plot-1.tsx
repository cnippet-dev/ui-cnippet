"use client";

import { BoxPlot } from "@/registry/default/charts/box-plot";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Precomputed salary quartiles per role.
const data = [
  {
    max: 142000,
    median: 108000,
    min: 78000,
    q1: 94000,
    q3: 121000,
    role: "Frontend",
  },
  {
    max: 168000,
    median: 124000,
    min: 86000,
    q1: 109000,
    q3: 139000,
    role: "Backend",
  },
  {
    max: 175000,
    median: 131000,
    min: 92000,
    q1: 115000,
    q3: 148000,
    role: "Platform",
  },
  {
    max: 132000,
    median: 101000,
    min: 72000,
    q1: 88000,
    q3: 114000,
    role: "Design",
  },
  {
    max: 188000,
    median: 142000,
    min: 98000,
    q1: 124000,
    q3: 160000,
    role: "Data",
  },
];

export default function SalaryByRole() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Base salary ranges by role, US offices, 2026"
      title="Salary by role"
    >
      <BoxPlot
        className="h-48"
        data={data}
        index="role"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
