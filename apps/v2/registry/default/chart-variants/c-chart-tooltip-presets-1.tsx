"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartTooltipComparison } from "@/registry/default/charts/chart-tooltip-presets";
import { formatCurrency } from "@/registry/default/lib/chart-utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

const data = [
  { lastYear: 182000, month: "Jan", revenue: 214000 },
  { lastYear: 176000, month: "Feb", revenue: 208000 },
  { lastYear: 195000, month: "Mar", revenue: 236000 },
  { lastYear: 201000, month: "Apr", revenue: 229000 },
  { lastYear: 214000, month: "May", revenue: 251000 },
  { lastYear: 222000, month: "Jun", revenue: 248000 },
  { lastYear: 218000, month: "Jul", revenue: 266000 },
  { lastYear: 231000, month: "Aug", revenue: 274000 },
];

const config = {
  lastYear: { color: "var(--muted-foreground)", label: "Last year" },
  revenue: { color: "var(--chart-1)", label: "Revenue" },
} satisfies ChartConfig;

export default function RevenueVsLastYear() {
  return (
    <ChartContainer className="h-64 w-full" config={config}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          content={
            <ChartTooltipComparison
              config={config}
              previous={{ revenue: "lastYear" }}
              valueFormatter={formatCurrency}
            />
          }
        />
        <Line
          dataKey="lastYear"
          dot={false}
          stroke="var(--color-lastYear)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          type="monotone"
        />
        <Line
          dataKey="revenue"
          dot={false}
          stroke="var(--color-revenue)"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  );
}
