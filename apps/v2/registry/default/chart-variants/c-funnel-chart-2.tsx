"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { FunnelChart } from "@/registry/default/charts/funnel-chart";

const data = [
  { sessions: 52400, step: "Viewed product" },
  { sessions: 14800, step: "Added to cart" },
  { sessions: 8350, step: "Started checkout" },
  { sessions: 6120, step: "Entered payment" },
  { sessions: 5480, step: "Purchased" },
];

export default function CheckoutFunnel() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Store sessions, last 30 days. Bars aligned left for easier comparison."
      footer="The biggest drop is between viewing a product and adding it to the cart."
      title="Checkout"
    >
      <FunnelChart
        align="start"
        category="sessions"
        color="var(--chart-2)"
        data={data}
        index="step"
      />
    </ChartCard>
  );
}
