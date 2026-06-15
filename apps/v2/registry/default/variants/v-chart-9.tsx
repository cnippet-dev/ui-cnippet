"use client";

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { hours: 8, score: 55 },
  { hours: 10, score: 62 },
  { hours: 12, score: 65 },
  { hours: 15, score: 71 },
  { hours: 16, score: 72 },
  { hours: 18, score: 75 },
  { hours: 20, score: 78 },
  { hours: 22, score: 80 },
  { hours: 25, score: 82 },
  { hours: 28, score: 85 },
  { hours: 30, score: 88 },
  { hours: 35, score: 92 },
];

const chartConfig = {
  score: { color: "var(--chart-1)", label: "Score" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <ScatterChart
        accessibilityLayer
        margin={{ bottom: 20, left: 8, right: 16, top: 8 }}
      >
        <CartesianGrid />
        <XAxis
          axisLine={false}
          dataKey="hours"
          label={{
            offset: -8,
            position: "insideBottom",
            style: { fontSize: 11 },
            value: "Study hours",
          }}
          tickLine={false}
          tickMargin={8}
          type="number"
        />
        <YAxis
          axisLine={false}
          dataKey="score"
          domain={[40, 100]}
          label={{
            angle: -90,
            offset: 12,
            position: "insideLeft",
            style: { fontSize: 11 },
            value: "Score",
          }}
          tickLine={false}
          type="number"
          width={36}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Scatter data={chartData} fill="var(--color-score)" />
      </ScatterChart>
    </ChartContainer>
  );
}
