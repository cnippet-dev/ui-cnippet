"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PolarAreaChart } from "@/registry/default/charts/polar-area-chart";

// Hours of wind from each direction in October; prevailing south-westerly.
const data = [
  { direction: "N", hours: 42 },
  { direction: "NE", hours: 28 },
  { direction: "E", hours: 35 },
  { direction: "SE", hours: 61 },
  { direction: "S", hours: 104 },
  { direction: "SW", hours: 186 },
  { direction: "W", hours: 152 },
  { direction: "NW", hours: 76 },
];

export default function WindRose() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Hours of wind by direction, October"
      title="Wind rose"
    >
      <PolarAreaChart
        category="hours"
        className="h-64"
        color="var(--chart-2)"
        data={data}
        index="direction"
        valueFormatter={(value) => `${value} h`}
      />
    </ChartCard>
  );
}
