"use client";

import { SyncedCharts } from "@/registry/default/charts/synced-charts";
import { formatCurrency, formatDate } from "@/registry/default/lib/chart-utils";

// 30 days of sales: orders and AOV move apart during a discount week.
const data = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 8, 26 + i));
  const sale = i >= 18 && i < 25;
  const orders = Math.round(
    310 + 4 * i + 40 * Math.sin(i / 3) + (sale ? 190 : 0),
  );
  const aov =
    Math.round((84 + 3 * Math.cos(i / 4) - (sale ? 12 : 0)) * 100) / 100;
  return {
    aov,
    date: date.toISOString().slice(0, 10),
    orders,
    revenue: Math.round(orders * aov),
  };
});

export default function SalesPanels() {
  return (
    <div className="w-full max-w-2xl rounded-lg border bg-card p-5">
      <div className="mb-3 font-medium text-sm">Store · last 30 days</div>
      <SyncedCharts
        data={data}
        index="date"
        indexFormatter={(value) => formatDate(value)}
        panelClassName="h-20"
        panels={[
          {
            categories: ["revenue"],
            title: "Revenue",
            valueFormatter: formatCurrency,
          },
          {
            categories: ["orders"],
            config: { orders: { color: "var(--chart-2)", label: "Orders" } },
            title: "Orders",
            type: "bar",
          },
          {
            categories: ["aov"],
            config: { aov: { color: "var(--chart-4)", label: "AOV" } },
            title: "Average order value",
            type: "line",
            valueFormatter: (value) => `$${value.toFixed(0)}`,
          },
        ]}
      />
    </div>
  );
}
