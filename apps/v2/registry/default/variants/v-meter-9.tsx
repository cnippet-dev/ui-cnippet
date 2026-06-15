"use client";

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const BUDGET = 8000;

const categories = [
  { color: "bg-chart-1", label: "Engineering", spent: 3200 },
  { color: "bg-chart-2", label: "Marketing", spent: 1800 },
  { color: "bg-chart-3", label: "Design", spent: 950 },
  { color: "bg-chart-4", label: "Operations", spent: 640 },
];

const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

export default function Particle() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Q2 Budget</p>
        <span className="text-muted-foreground text-sm">
          ${totalSpent.toLocaleString()} / ${BUDGET.toLocaleString()}
        </span>
      </div>
      <Meter max={BUDGET} value={totalSpent}>
        <MeterTrack className="h-3">
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <div className="space-y-2.5">
        {categories.map(({ color, label, spent }) => (
          <Meter key={label} max={BUDGET} value={spent}>
            <div className="flex items-center justify-between gap-2">
              <MeterLabel className="flex items-center gap-1.5 font-normal text-muted-foreground">
                <span className={`size-2 rounded-full ${color}`} />
                {label}
              </MeterLabel>
              <MeterValue>{() => `$${spent.toLocaleString()}`}</MeterValue>
            </div>
            <MeterTrack className="h-1">
              <MeterIndicator className={color} />
            </MeterTrack>
          </Meter>
        ))}
      </div>
    </div>
  );
}
