"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { DonutChart } from "@/registry/default/charts/donut-chart";
import { formatCurrency, sumBy } from "@/registry/default/lib/chart-utils";

const data = [
  { amount: 186000, line: "Payroll" },
  { amount: 54000, line: "Infrastructure" },
  { amount: 38000, line: "Marketing" },
  { amount: 21000, line: "Tools" },
  { amount: 12000, line: "Travel" },
];

export default function BudgetSplit() {
  return (
    <ChartCard
      className="max-w-md"
      description="Q4 operating budget by line"
      title="Budget"
    >
      <DonutChart
        category="amount"
        centerLabel="Q4 total"
        centerValue={formatCurrency(sumBy(data, ["amount"]))}
        className="h-52"
        data={data}
        index="line"
        legendLayout="side"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
