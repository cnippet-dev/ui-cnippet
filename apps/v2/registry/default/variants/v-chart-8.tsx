"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { food: 420, housing: 1200, month: "Jan", transport: 280 },
  { food: 390, housing: 1200, month: "Feb", transport: 310 },
  { food: 450, housing: 1200, month: "Mar", transport: 260 },
  { food: 480, housing: 1250, month: "Apr", transport: 295 },
  { food: 510, housing: 1250, month: "May", transport: 340 },
  { food: 530, housing: 1250, month: "Jun", transport: 380 },
];

const chartConfig = {
  food: { color: "var(--chart-2)", label: "Food" },
  housing: { color: "var(--chart-1)", label: "Housing" },
  transport: { color: "var(--chart-3)", label: "Transport" },
} satisfies ChartConfig;

export function Pattern() {
  return (
    <ChartContainer className="min-h-52 w-full" config={chartConfig}>
      <BarChart
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
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="housing"
          fill="var(--color-housing)"
          radius={[0, 0, 0, 0]}
          stackId="a"
        />
        <Bar
          dataKey="food"
          fill="var(--color-food)"
          radius={[0, 0, 0, 0]}
          stackId="a"
        />
        <Bar
          dataKey="transport"
          fill="var(--color-transport)"
          radius={[4, 4, 0, 0]}
          stackId="a"
        />
      </BarChart>
    </ChartContainer>
  );
}
