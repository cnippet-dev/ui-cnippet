"use client";

import { ReferenceLine } from "recharts";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Monthly net income: two loss-making months after a hiring push.
const data = [
  { month: "Jan", net: 18400 },
  { month: "Feb", net: 12900 },
  { month: "Mar", net: -6200 },
  { month: "Apr", net: -11800 },
  { month: "May", net: 4300 },
  { month: "Jun", net: 15600 },
  { month: "Jul", net: 21200 },
  { month: "Aug", net: 24800 },
];

export default function NetIncome() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Net income per month, after payroll and infrastructure"
      title="Profit & loss"
      value={formatCurrency(78900)}
    >
      <BarChart
        categories={["net"]}
        className="h-48"
        config={{ net: { color: "var(--chart-2)", label: "Net income" } }}
        data={data}
        index="month"
        radius={2}
        valueFormatter={formatCurrency}
      >
        <ReferenceLine stroke="var(--border)" y={0} />
      </BarChart>
    </ChartCard>
  );
}
