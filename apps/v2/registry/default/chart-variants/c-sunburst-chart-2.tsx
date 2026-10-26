"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SunburstChart } from "@/registry/default/charts/sunburst-chart";

// GB per folder and its largest subfolders.
const data = [
  {
    children: [
      { name: "node_modules", value: 38.2 },
      { name: "builds", value: 12.6 },
      { name: "src", value: 1.4 },
    ],
    name: "Projects",
  },
  {
    children: [
      { name: "Photos", value: 64.1 },
      { name: "Videos", value: 41.8 },
    ],
    name: "Media",
  },
  {
    children: [
      { name: "Docker images", value: 22.4 },
      { name: "VMs", value: 30.2 },
    ],
    name: "Containers",
  },
  { name: "System", value: 18.9 },
];

export default function DiskUsage() {
  return (
    <ChartCard
      className="max-w-sm"
      description="229.6 GB used, by folder"
      title="Disk usage"
    >
      <SunburstChart
        className="h-64"
        data={data}
        valueFormatter={(value) => `${value.toFixed(1)} GB`}
      />
    </ChartCard>
  );
}
