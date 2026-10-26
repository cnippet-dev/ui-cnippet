"use client";

import { BarChart } from "@/registry/default/charts/bar-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

const data = [
  { page: "/pricing", views: 48210 },
  { page: "/docs/install", views: 39870 },
  { page: "/blog/v2-launch", views: 31540 },
  { page: "/changelog", views: 22960 },
  { page: "/docs/theming", views: 18430 },
  { page: "/careers", views: 9120 },
];

export default function TopPages() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Page views, last 30 days"
      title="Top pages"
    >
      <BarChart
        categories={["views"]}
        className="h-52"
        config={{ views: { color: "var(--chart-2)", label: "Views" } }}
        data={data}
        index="page"
        layout="vertical"
        showGrid={false}
        showValues
        showXAxis={false}
        yAxisWidth={112}
      />
    </ChartCard>
  );
}
