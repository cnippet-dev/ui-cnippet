"use client";

import { BulletChart } from "@/registry/default/charts/bullet-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Q3 closed-won per rep against a $120K quota. Bands: under 70%, 70–100%, over 100%.
const reps = [
  { closed: 98400, name: "Ana" },
  { closed: 131200, name: "Marcus" },
  { closed: 112700, name: "Priya" },
  { closed: 87500, name: "Jonah" },
];
const QUOTA = 120000;

export default function SalesVsQuota() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">Sales vs quota, Q3</div>
      <ul className="mt-4 grid gap-4">
        {reps.map((r) => (
          <li
            className="grid grid-cols-[4.5rem_1fr_4rem] items-center gap-3"
            key={r.name}
          >
            <span className="text-sm">{r.name}</span>
            <BulletChart
              aria-label={`${r.name}: ${formatCurrency(r.closed)} of ${formatCurrency(QUOTA)} quota`}
              max={150000}
              ranges={[84000, 120000, 150000]}
              target={QUOTA}
              value={r.closed}
              valueFormatter={formatCurrency}
            />
            <span className="text-end text-sm tabular-nums">
              {formatCurrency(r.closed)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
