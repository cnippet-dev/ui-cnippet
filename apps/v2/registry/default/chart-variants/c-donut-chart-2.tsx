"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { DonutChart } from "@/registry/default/charts/donut-chart";

// GB used by type, out of a 128 GB plan.
const data = [
  { gb: 31.4, type: "Photos" },
  { gb: 18.2, type: "Video" },
  { gb: 6.9, type: "Documents" },
  { gb: 7.5, type: "Apps" },
  { gb: 64, type: "Free" },
];

export default function StorageUsed() {
  return (
    <ChartCard
      className="max-w-md"
      description="64 GB of 128 GB used"
      title="Storage"
    >
      <DonutChart
        category="gb"
        centerLabel="of 128 GB"
        centerValue="64 GB"
        className="h-52"
        config={{ Free: { color: "var(--muted)", label: "Free" } }}
        data={data}
        index="type"
        legendLayout="side"
        valueFormatter={(value) => `${value} GB`}
      />
    </ChartCard>
  );
}
