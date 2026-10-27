"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Heatmap } from "@/registry/default/charts/heatmap";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const services = ["api", "auth", "billing", "search", "webhooks"];
const days = [
  "Oct 20",
  "Oct 21",
  "Oct 22",
  "Oct 23",
  "Oct 24",
  "Oct 25",
  "Oct 26",
];

// Deterministic error rates, with a billing incident on Oct 23.
const data = services.flatMap((service, s) =>
  days.map((day, d) => ({
    day,
    rate:
      service === "billing" && d === 3
        ? 0.084
        : (0.002 + ((s * 7 + d * 3) % 9) * 0.0011) *
          (service === "search" ? 2.2 : 1),
    service,
  })),
);

export default function ErrorRateByService() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="5xx responses as a share of requests, per service and day"
      footer="Billing spiked to 8.4% on Oct 23 during the payment-provider outage."
      title="Error rate"
    >
      <Heatmap
        cellLabel={(row) =>
          `${row.service}, ${row.day}: ${formatPercent(row.rate, { digits: 2 })} errors`
        }
        color="var(--destructive)"
        data={data}
        value="rate"
        valueFormatter={(v) => formatPercent(v, { digits: 1 })}
        x="day"
        xFormatter={(day) => day.replace("Oct ", "")}
        y="service"
      />
    </ChartCard>
  );
}
