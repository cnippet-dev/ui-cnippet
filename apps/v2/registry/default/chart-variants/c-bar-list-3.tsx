"use client";

import { useState } from "react";
import { BarList } from "@/registry/default/charts/bar-list";
import { ChartCard } from "@/registry/default/charts/chart-card";

const referrers = [
  { name: "google.com", value: 18420 },
  { name: "github.com", value: 9310 },
  { name: "news.ycombinator.com", value: 6280 },
  { name: "x.com", value: 4170 },
  { name: "reddit.com", value: 2960 },
];

export default function ClickableReferrers() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ChartCard
      className="max-w-md"
      description="Click a referrer to filter the dashboard"
      footer={
        selected ? (
          <span>
            Filtered to{" "}
            <span className="font-medium text-foreground">{selected}</span>
          </span>
        ) : (
          "No filter applied"
        )
      }
      title="Referrers"
    >
      <BarList
        aria-label="Visitors by referrer"
        data={referrers}
        onValueClick={(item) => setSelected(item.name)}
      />
    </ChartCard>
  );
}
