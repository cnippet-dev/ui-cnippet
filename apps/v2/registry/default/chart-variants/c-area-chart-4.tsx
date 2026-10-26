"use client";

import { AreaChart } from "@/registry/default/charts/area-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Storage only grows when a new tier is provisioned, so it moves in steps.
const data = [
  { day: "Oct 1", storage: 120 },
  { day: "Oct 4", storage: 120 },
  { day: "Oct 7", storage: 160 },
  { day: "Oct 10", storage: 160 },
  { day: "Oct 13", storage: 160 },
  { day: "Oct 16", storage: 240 },
  { day: "Oct 19", storage: 240 },
  { day: "Oct 22", storage: 320 },
  { day: "Oct 25", storage: 320 },
];

const gigabytes = (value: number) => `${value} GB`;

export default function ProvisionedStorage() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Provisioned database storage, October"
      title="Storage"
      value={gigabytes(320)}
    >
      <AreaChart
        categories={["storage"]}
        className="h-48"
        config={{ storage: { color: "var(--chart-3)", label: "Provisioned" } }}
        curve="step"
        data={data}
        fill="solid"
        index="day"
        valueFormatter={gigabytes}
        yAxisWidth={56}
      />
    </ChartCard>
  );
}
