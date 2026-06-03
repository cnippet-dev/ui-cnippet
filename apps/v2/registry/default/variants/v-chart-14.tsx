"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { month: "Jan", p50: 120, p90: 340, p99: 780 },
  { month: "Feb", p50: 135, p90: 310, p99: 820 },
  { month: "Mar", p50: 110, p90: 290, p99: 640 },
  { month: "Apr", p50: 145, p90: 380, p99: 910 },
  { month: "May", p50: 128, p90: 355, p99: 760 },
  { month: "Jun", p50: 118, p90: 320, p99: 700 },
];

const chartConfig = {
  p50: { color: "var(--chart-1)", label: "p50 (ms)" },
  p90: { color: "var(--chart-2)", label: "p90 (ms)" },
  p99: { color: "var(--chart-3)", label: "p99 (ms)" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 8, right: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          tickFormatter={(v) => `${v}ms`}
          tickLine={false}
          width={48}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="p50"
          dot={false}
          stroke="var(--color-p50)"
          strokeWidth={2}
          type="monotone"
        />
        <Line
          dataKey="p90"
          dot={false}
          stroke="var(--color-p90)"
          strokeDasharray="4 2"
          strokeWidth={2}
          type="monotone"
        />
        <Line
          dataKey="p99"
          dot={false}
          stroke="var(--color-p99)"
          strokeDasharray="2 2"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  );
}
