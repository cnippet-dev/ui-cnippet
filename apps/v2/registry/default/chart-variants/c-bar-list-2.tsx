"use client";

import { BarList } from "@/registry/default/charts/bar-list";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const countries = [
  {
    icon: <span aria-hidden="true">🇺🇸</span>,
    name: "United States",
    value: 0.382,
  },
  { icon: <span aria-hidden="true">🇩🇪</span>, name: "Germany", value: 0.124 },
  { icon: <span aria-hidden="true">🇮🇳</span>, name: "India", value: 0.117 },
  {
    icon: <span aria-hidden="true">🇬🇧</span>,
    name: "United Kingdom",
    value: 0.089,
  },
  { icon: <span aria-hidden="true">🇧🇷</span>, name: "Brazil", value: 0.061 },
];

export default function TopCountries() {
  return (
    <ChartCard
      className="max-w-md"
      description="Share of visitors, last 30 days"
      title="Top countries"
    >
      <BarList
        aria-label="Visitors by country"
        data={countries}
        valueFormatter={(value) => formatPercent(value)}
      />
    </ChartCard>
  );
}
