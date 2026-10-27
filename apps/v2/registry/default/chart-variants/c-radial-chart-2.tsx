"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadialChart } from "@/registry/default/charts/radial-chart";
import { Button } from "@/registry/default/ui/button";

const SEATS = 50;
const data = [{ metric: "Seats", used: 42 }];

export default function PlanUsage() {
  return (
    <ChartCard
      className="max-w-xs"
      description="Team plan"
      footer={
        <div className="flex w-full items-center justify-between gap-3">
          <span>8 seats left</span>
          <Button size="sm" variant="outline">
            Add seats
          </Button>
        </div>
      }
      title="Seats used"
    >
      <RadialChart
        category="used"
        centerLabel={`of ${SEATS} seats`}
        centerValue="42"
        className="h-44"
        data={data}
        endAngle={-180}
        index="metric"
        max={SEATS}
        showLegend={false}
        startAngle={180}
      />
    </ChartCard>
  );
}
