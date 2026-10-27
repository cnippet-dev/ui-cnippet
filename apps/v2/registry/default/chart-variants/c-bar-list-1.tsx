"use client";

import { BarList } from "@/registry/default/charts/bar-list";
import { ChartCard } from "@/registry/default/charts/chart-card";

const pages = [
  { name: "/pricing", value: 48210 },
  { name: "/docs/install", value: 39870 },
  { name: "/blog/v2-launch", value: 31540 },
  { name: "/changelog", value: 22960 },
  { name: "/docs/theming", value: 18430 },
];

export default function TopPages() {
  return (
    <ChartCard
      className="max-w-md"
      description="Page views, last 30 days"
      title="Top pages"
    >
      <BarList aria-label="Top pages by views" data={pages} />
    </ChartCard>
  );
}
