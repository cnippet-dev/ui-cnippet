"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { month: "Jan", oneTime: 1800, recurring: 4200 },
  { month: "Feb", oneTime: 2100, recurring: 5100 },
  { month: "Mar", oneTime: 3200, recurring: 4800 },
  { month: "Apr", oneTime: 2600, recurring: 6200 },
  { month: "May", oneTime: 3100, recurring: 7100 },
  { month: "Jun", oneTime: 2900, recurring: 8400 },
];

const chartConfig = {
  oneTime: { color: "var(--chart-2)", label: "One-time" },
  recurring: { color: "var(--chart-1)", label: "Recurring" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <AreaChart
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
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          tickLine={false}
          width={40}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="oneTime"
          fill="var(--color-oneTime)"
          fillOpacity={0.3}
          stackId="a"
          stroke="var(--color-oneTime)"
          type="natural"
        />
        <Area
          dataKey="recurring"
          fill="var(--color-recurring)"
          fillOpacity={0.5}
          stackId="a"
          stroke="var(--color-recurring)"
          type="natural"
        />
      </AreaChart>
    </ChartContainer>
  );
}
