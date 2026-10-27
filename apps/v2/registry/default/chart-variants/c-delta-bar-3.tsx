"use client";

import { DeltaBar } from "@/registry/default/charts/delta-bar";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const metrics = [
  { change: 0.124, invert: false, name: "Signups", value: "1,046" },
  { change: -0.062, invert: false, name: "Activation", value: "38%" },
  { change: -0.21, invert: true, name: "Support tickets", value: "182" },
];

export default function WeekOverWeek() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {metrics.map((m) => (
        <div className="rounded-lg border bg-card p-4" key={m.name}>
          <div className="text-muted-foreground text-xs">{m.name}</div>
          <div className="mt-1 font-semibold text-xl tabular-nums">
            {m.value}
          </div>
          <DeltaBar
            aria-label={`${m.name} ${formatPercent(m.change, { signed: true })} week over week`}
            className="mt-3"
            invertDelta={m.invert}
            value={m.change}
          />
          <div className="mt-1.5 text-muted-foreground text-xs tabular-nums">
            {formatPercent(m.change, { signed: true })} WoW
          </div>
        </div>
      ))}
    </div>
  );
}
