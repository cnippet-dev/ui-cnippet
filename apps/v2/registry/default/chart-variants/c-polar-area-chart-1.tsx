"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PolarAreaChart } from "@/registry/default/charts/polar-area-chart";

const data = [
  { day: "Mon", workouts: 412 },
  { day: "Tue", workouts: 386 },
  { day: "Wed", workouts: 441 },
  { day: "Thu", workouts: 398 },
  { day: "Fri", workouts: 287 },
  { day: "Sat", workouts: 512 },
  { day: "Sun", workouts: 468 },
];

export default function ActivityByWeekday() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Workouts logged by weekday, last 4 weeks"
      title="Activity by day"
    >
      <PolarAreaChart
        category="workouts"
        className="h-64"
        color="var(--chart-1)"
        data={data}
        index="day"
        valueFormatter={(value) => `${value} workouts`}
      />
    </ChartCard>
  );
}
