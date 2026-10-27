"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Sankey } from "@/registry/default/charts/sankey";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { source: "Budget", target: "Engineering", value: 4800000 },
  { source: "Budget", target: "Go-to-market", value: 3100000 },
  { source: "Budget", target: "G&A", value: 1400000 },
  { source: "Engineering", target: "Salaries", value: 3900000 },
  { source: "Engineering", target: "Cloud", value: 900000 },
  { source: "Go-to-market", target: "Salaries", value: 1900000 },
  { source: "Go-to-market", target: "Ads", value: 1200000 },
  { source: "G&A", target: "Salaries", value: 800000 },
  { source: "G&A", target: "Office", value: 600000 },
];

export default function BudgetFlow() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="FY2027 budget by department, then by type of spend"
      title="Budget allocation"
      value={formatCurrency(9300000)}
    >
      <Sankey
        className="h-48"
        config={{ Budget: { color: "var(--muted-foreground)" } }}
        data={data}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
