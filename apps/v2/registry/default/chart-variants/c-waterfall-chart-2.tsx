"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { WaterfallChart } from "@/registry/default/charts/waterfall-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { amount: 2400000, line: "Revenue" },
  { amount: -960000, line: "COGS" },
  { amount: null, line: "Gross profit" },
  { amount: -540000, line: "Payroll" },
  { amount: -210000, line: "Marketing" },
  { amount: -120000, line: "Tooling" },
  { amount: null, line: "Operating profit" },
  { amount: -142000, line: "Tax" },
  { amount: null, line: "Net profit" },
];

export default function ProfitBridge() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="FY2026 profit and loss, from revenue to net profit"
      title="P&L bridge"
    >
      <WaterfallChart
        category="amount"
        className="h-52"
        config={{ total: { label: "Subtotal" } }}
        data={data}
        index="line"
        indexFormatter={(v) => v.replace(" profit", "")}
        totals={["Revenue", "Gross profit", "Operating profit", "Net profit"]}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
