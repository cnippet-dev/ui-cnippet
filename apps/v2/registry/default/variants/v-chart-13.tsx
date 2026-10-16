"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { dept: "design", fill: "var(--color-design)", value: 35 },
  { dept: "engineering", fill: "var(--color-engineering)", value: 42 },
  { dept: "marketing", fill: "var(--color-marketing)", value: 15 },
  { dept: "ops", fill: "var(--color-ops)", value: 8 },
];

const chartConfig = {
  design: { color: "var(--chart-2)", label: "Design" },
  engineering: { color: "var(--chart-1)", label: "Engineering" },
  marketing: { color: "var(--chart-3)", label: "Marketing" },
  ops: { color: "var(--chart-4)", label: "Operations" },
} satisfies ChartConfig;

const total = chartData.reduce((sum, d) => sum + d.value, 0);

export function Pattern() {
  return (
    <ChartContainer
      className="mx-auto aspect-square max-h-64 w-full"
      config={chartConfig}
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel nameKey="dept" />}
          cursor={false}
        />
        <Pie
          cx="50%"
          cy="42%"
          data={chartData}
          dataKey="value"
          innerRadius="55%"
          nameKey="dept"
          outerRadius="75%"
          paddingAngle={3}
          strokeWidth={0}
        >
          {chartData.map((entry) => (
            <Cell fill={entry.fill} key={entry.dept} />
          ))}
        </Pie>
        <text dominantBaseline="central" textAnchor="middle" x="50%" y="42%">
          <tspan
            className="fill-foreground font-bold text-2xl"
            dy="-0.5em"
            x="50%"
          >
            {total}
          </tspan>
          <tspan className="fill-muted-foreground text-xs" dy="1.4em" x="50%">
            headcount
          </tspan>
        </text>
        <ChartLegend content={<ChartLegendContent nameKey="dept" />} />
      </PieChart>
    </ChartContainer>
  );
}
