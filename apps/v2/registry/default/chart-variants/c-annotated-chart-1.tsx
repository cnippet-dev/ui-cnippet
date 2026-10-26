"use client";

import { AnnotatedChart } from "@/registry/default/charts/annotated-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatPercent } from "@/registry/default/lib/chart-utils";

// Error rate by hour; the 13:00 deploy caused a spike, the 15:00 rollback fixed it.
const data = Array.from({ length: 24 }, (_, h) => {
  const bad = h >= 13 && h < 15;
  return {
    errors:
      Math.round(
        (0.0042 + 0.0011 * Math.sin(h / 2) + (bad ? 0.018 : 0)) * 10000,
      ) / 10000,
    hour: `${String(h).padStart(2, "0")}:00`,
  };
});

export default function DeployMarkers() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="5xx responses as a share of requests, today"
      title="Error rate"
    >
      <AnnotatedChart
        categories={["errors"]}
        className="h-56"
        config={{
          errors: { color: "var(--destructive)", label: "Error rate" },
        }}
        data={data}
        events={[
          { label: "Deploy v2.14", x: "13:00" },
          { label: "Rollback", x: "15:00" },
        ]}
        index="hour"
        targets={[{ label: "SLO 1%", y: 0.01 }]}
        valueFormatter={(value) => formatPercent(value)}
      />
    </ChartCard>
  );
}
