"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { PolarAreaChart } from "@/registry/default/charts/polar-area-chart";

// Support tickets by topic this week.
const data = [
  { tickets: 184, topic: "Billing" },
  { tickets: 126, topic: "Login" },
  { tickets: 92, topic: "Integrations" },
  { tickets: 61, topic: "Exports" },
  { tickets: 38, topic: "Mobile" },
];

export default function TicketsByTopic() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Support tickets by topic, this week"
      title="Ticket volume"
    >
      <PolarAreaChart
        category="tickets"
        className="h-64"
        data={data}
        index="topic"
        valueFormatter={(value) => `${value} tickets`}
      />
    </ChartCard>
  );
}
