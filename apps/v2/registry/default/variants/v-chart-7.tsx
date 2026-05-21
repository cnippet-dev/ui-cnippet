"use client";

import { RadialBar, RadialBarChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

export const description = "A radial chart";

const chartData = [
  { browser: "chrome", fill: "var(--color-chrome)", visitors: 275 },
  { browser: "safari", fill: "var(--color-safari)", visitors: 200 },
  { browser: "firefox", fill: "var(--color-firefox)", visitors: 187 },
  { browser: "edge", fill: "var(--color-edge)", visitors: 173 },
  { browser: "other", fill: "var(--color-other)", visitors: 90 },
];

const chartConfig = {
  chrome: {
    color: "var(--chart-1)",
    label: "Chrome",
  },
  edge: {
    color: "var(--chart-4)",
    label: "Edge",
  },
  firefox: {
    color: "var(--chart-3)",
    label: "Firefox",
  },
  other: {
    color: "var(--chart-5)",
    label: "Other",
  },
  safari: {
    color: "var(--chart-2)",
    label: "Safari",
  },
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function ChartRadialSimple() {
  return (
    <ChartContainer
      className="mx-auto aspect-square max-h-62.5 w-full"
      config={chartConfig}
    >
      <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
          cursor={false}
        />
        <RadialBar background dataKey="visitors" />
      </RadialBarChart>
    </ChartContainer>
  );
}
