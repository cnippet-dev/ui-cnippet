"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PieChart } from "@/registry/default/charts/pie-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { amount: 1840, category: "Rent" },
  { amount: 620, category: "Groceries" },
  { amount: 310, category: "Transport" },
  { amount: 260, category: "Dining out" },
  { amount: 190, category: "Subscriptions" },
];

export default function Expenses() {
  return (
    <ChartCard
      className="max-w-md"
      description="Spending by category, September"
      title="Expenses"
      value={formatCurrency(3220, "USD", { compact: false })}
    >
      <PieChart
        category="amount"
        className="h-48"
        data={data}
        index="category"
        legendLayout="side"
        valueFormatter={(value) =>
          formatCurrency(value, "USD", { compact: false })
        }
      />
    </ChartCard>
  );
}
