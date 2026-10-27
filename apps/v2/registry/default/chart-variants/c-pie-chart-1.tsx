"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PieChart } from "@/registry/default/charts/pie-chart";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const data = [
  { browser: "Chrome", share: 0.64 },
  { browser: "Safari", share: 0.19 },
  { browser: "Edge", share: 0.08 },
  { browser: "Firefox", share: 0.05 },
  { browser: "Other", share: 0.04 },
];

export default function BrowserShare() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Sessions by browser, October"
      title="Browsers"
    >
      <PieChart
        category="share"
        className="h-60"
        data={data}
        index="browser"
        valueFormatter={(value) => formatPercent(value, { digits: 0 })}
      />
    </ChartCard>
  );
}
