"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { formatCurrency } from "@/registry/default/lib/chart-utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

const data = [
  { month: "Jan", revenue: 31200 },
  { month: "Feb", revenue: 33850 },
  { month: "Mar", revenue: 36400 },
  { month: "Apr", revenue: 38900 },
  { month: "May", revenue: 42900 },
  { month: "Jun", revenue: 48200 },
];

const config = {
  revenue: { color: "var(--chart-1)", label: "Revenue" },
} satisfies ChartConfig;

export default function RevenueCard() {
  return (
    <ChartCard
      className="max-w-md"
      delta={0.124}
      description="Monthly recurring revenue, Jan – Jun 2026"
      title="Revenue"
      value={formatCurrency(48200)}
    >
      <ChartContainer className="h-40 w-full" config={config}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{ left: 0, right: 0 }}
        >
          <defs>
            <linearGradient id="fill-revenue" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            content={
              <ChartTooltipList
                config={config}
                valueFormatter={formatCurrency}
              />
            }
            cursor={false}
          />
          <Area
            dataKey="revenue"
            fill="url(#fill-revenue)"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}
