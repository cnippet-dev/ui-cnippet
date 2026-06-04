"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { channel: "Organic", sessions: 4820 },
  { channel: "Direct", sessions: 3210 },
  { channel: "Referral", sessions: 2760 },
  { channel: "Social", sessions: 1940 },
  { channel: "Email", sessions: 1380 },
  { channel: "Paid", sessions: 920 },
];

const chartConfig = {
  sessions: { color: "var(--chart-1)", label: "Sessions" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{ left: 0, right: 12 }}
      >
        <XAxis hide type="number" />
        <YAxis
          axisLine={false}
          dataKey="channel"
          tickLine={false}
          tickMargin={4}
          type="category"
          width={60}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
