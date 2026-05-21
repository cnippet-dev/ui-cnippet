"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

export const description = "A line chart";

const chartData = [
  { desktop: 186, month: "January" },
  { desktop: 305, month: "February" },
  { desktop: 237, month: "March" },
  { desktop: 73, month: "April" },
  { desktop: 209, month: "May" },
  { desktop: 214, month: "June" },
];

const chartConfig = {
  desktop: {
    color: "var(--chart-1)",
    label: "Desktop",
  },
} satisfies ChartConfig;

export function ChartLineDefault() {
  return (
    <ChartContainer className="min-h-50 w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Line
          dataKey="desktop"
          dot={false}
          stroke="var(--color-desktop)"
          strokeWidth={2}
          type="natural"
        />
      </LineChart>
    </ChartContainer>
  );
}
