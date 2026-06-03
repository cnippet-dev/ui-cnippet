"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { growth: 8.2, month: "Jan", revenue: 12400 },
  { growth: 21.8, month: "Feb", revenue: 15100 },
  { growth: -8.6, month: "Mar", revenue: 13800 },
  { growth: 24.6, month: "Apr", revenue: 17200 },
  { growth: 14.0, month: "May", revenue: 19600 },
  { growth: 12.8, month: "Jun", revenue: 22100 },
];

const chartConfig = {
  growth: { color: "var(--chart-2)", label: "Growth %" },
  revenue: { color: "var(--chart-1)", label: "Revenue ($)" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <ComposedChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 8, right: 16 }}
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
          width={44}
          yAxisId="left"
        />
        <YAxis
          axisLine={false}
          orientation="right"
          tickFormatter={(v) => `${v}%`}
          tickLine={false}
          width={36}
          yAxisId="right"
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={4}
          yAxisId="left"
        />
        <Line
          dataKey="growth"
          dot={{ fill: "var(--color-growth)", r: 3 }}
          stroke="var(--color-growth)"
          strokeWidth={2}
          type="monotone"
          yAxisId="right"
        />
      </ComposedChart>
    </ChartContainer>
  );
}
