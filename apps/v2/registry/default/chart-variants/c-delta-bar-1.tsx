"use client";

import { DeltaBar } from "@/registry/default/charts/delta-bar";

// NPS this quarter vs last, per product area. Delta is the change in points / 100.
const areas = [
  { delta: 0.18, name: "Onboarding", nps: 52 },
  { delta: 0.07, name: "Billing", nps: 31 },
  { delta: -0.11, name: "Mobile app", nps: 24 },
  { delta: -0.03, name: "Support", nps: 46 },
];

export default function NpsChange() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">NPS change vs last quarter</div>
      <ul className="mt-4 grid gap-4">
        {areas.map((a) => (
          <li
            className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-3"
            key={a.name}
          >
            <span className="truncate text-sm">{a.name}</span>
            <DeltaBar
              aria-label={`${a.name}: NPS ${a.nps}, ${a.delta > 0 ? "up" : "down"} ${Math.abs(Math.round(a.delta * 100))} points`}
              value={a.delta}
            />
            <span className="text-end text-sm tabular-nums">
              {a.delta > 0 ? "+" : "−"}
              {Math.abs(Math.round(a.delta * 100))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
