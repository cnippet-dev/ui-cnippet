"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { formatCurrency } from "@/registry/default/lib/chart-utils";
import { Button } from "@/registry/default/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

// Payouts are monthly, so the last 7 days have none.
const payouts = [
  { amount: 18400, month: "Jul" },
  { amount: 21250, month: "Aug" },
  { amount: 19800, month: "Sep" },
];

const config = {
  amount: { color: "var(--chart-3)", label: "Payout" },
} satisfies ChartConfig;

export default function NoDataInRange() {
  const [range, setRange] = useState<"7d" | "90d">("7d");
  const data = range === "7d" ? [] : payouts;

  return (
    <ChartCard
      className="max-w-lg"
      description={range === "7d" ? "Last 7 days" : "Last 90 days"}
      title="Payouts"
    >
      {data.length === 0 ? (
        <ChartEmpty
          action={
            <Button onClick={() => setRange("90d")} size="sm" variant="outline">
              Show last 90 days
            </Button>
          }
          className="aspect-auto h-48"
          description="Payouts land on the 1st of each month."
          title="No payouts in this range"
        />
      ) : (
        <ChartContainer className="h-48 w-full" config={config}>
          <BarChart accessibilityLayer data={data}>
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
                  valueFormatter={(value) =>
                    formatCurrency(value, "USD", { compact: false })
                  }
                />
              }
              cursor={false}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}
