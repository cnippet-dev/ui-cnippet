"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadialChart } from "@/registry/default/charts/radial-chart";

// Today's progress toward each daily goal, in %.
const data = [
  { goal: "Stand", progress: 92 },
  { goal: "Exercise", progress: 64 },
  { goal: "Move", progress: 81 },
];

export default function ActivityRings() {
  return (
    <ChartCard
      className="max-w-xs"
      description="Progress toward today's goals"
      title="Activity"
    >
      <RadialChart
        category="progress"
        centerLabel="average"
        centerValue="79%"
        className="h-60"
        config={{
          Exercise: { color: "var(--chart-2)" },
          Move: { color: "var(--chart-5)" },
          Stand: { color: "var(--chart-1)" },
        }}
        data={data}
        index="goal"
        max={100}
        valueFormatter={(value) => `${value}%`}
      />
    </ChartCard>
  );
}
