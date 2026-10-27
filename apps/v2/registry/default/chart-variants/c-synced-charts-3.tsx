"use client";

import { SyncedCharts } from "@/registry/default/charts/synced-charts";
import { formatPercent } from "@/registry/default/lib/chart-utils";

// Traffic vs conversion by hour: the evening peak brings visitors, not buyers.
const data = Array.from({ length: 24 }, (_, h) => ({
  conversion:
    Math.round(
      (0.031 + 0.009 * Math.sin(((h - 9) / 24) * 2 * Math.PI)) * 1000,
    ) / 1000,
  hour: `${String(h).padStart(2, "0")}:00`,
  sessions: Math.round(
    900 +
      2600 * Math.max(0, Math.sin(((h - 6) / 24) * 2 * Math.PI)) +
      (h >= 19 && h <= 22 ? 1400 : 0),
  ),
}));

export default function TrafficAndConversion() {
  return (
    <div className="w-full max-w-2xl rounded-lg border bg-card p-5">
      <div className="mb-3 font-medium text-sm">Today by hour</div>
      <SyncedCharts
        data={data}
        index="hour"
        panelClassName="h-28"
        panels={[
          { categories: ["sessions"], title: "Sessions" },
          {
            categories: ["conversion"],
            config: {
              conversion: { color: "var(--chart-2)", label: "Conversion" },
            },
            title: "Conversion rate",
            type: "line",
            valueFormatter: (value) => formatPercent(value),
          },
        ]}
      />
    </div>
  );
}
