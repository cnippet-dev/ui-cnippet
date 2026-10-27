"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { FunnelChart } from "@/registry/default/charts/funnel-chart";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const data = [
  { step: "Visited signup", users: 18420 },
  { step: "Started form", users: 9860 },
  { step: "Verified email", users: 6215 },
  { step: "Created workspace", users: 4890 },
  { step: "Invited a teammate", users: 2130 },
];

export default function SignupFunnel() {
  return (
    <ChartCard
      className="max-w-xl"
      description="New visitors in October, from landing to first invite"
      title="Signup funnel"
      value={formatPercent(2130 / 18420)}
    >
      <FunnelChart category="users" data={data} index="step" />
    </ChartCard>
  );
}
