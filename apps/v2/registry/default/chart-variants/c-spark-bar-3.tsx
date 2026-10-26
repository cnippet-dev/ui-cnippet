"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SparkBar } from "@/registry/default/charts/spark-bar";

// Weekly orders by channel, last 12 weeks.
const data = [
  { app: 410, web: 820, week: 1 },
  { app: 455, web: 870, week: 2 },
  { app: 498, web: 905, week: 3 },
  { app: 521, web: 940, week: 4 },
  { app: 566, web: 980, week: 5 },
  { app: 602, web: 1015, week: 6 },
  { app: 640, web: 990, week: 7 },
  { app: 688, web: 1042, week: 8 },
  { app: 712, web: 1070, week: 9 },
  { app: 761, web: 1098, week: 10 },
  { app: 805, web: 1121, week: 11 },
  { app: 849, web: 1150, week: 12 },
];

export default function WeeklyVolume() {
  return (
    <ChartCard
      className="max-w-xs"
      delta={0.047}
      description="Weekly orders, web and app stacked"
      title="Orders"
      value="1,999"
    >
      <SparkBar
        categories={["web", "app"]}
        className="h-16 w-full"
        data={data}
        index="week"
        type="stacked"
      />
    </ChartCard>
  );
}
