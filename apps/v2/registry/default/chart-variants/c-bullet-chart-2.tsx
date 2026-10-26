"use client";

import { BulletChart } from "@/registry/default/charts/bullet-chart";

// First-response time (hours) per support tier, against its SLA.
// Lower is better, so the bar turns red when it passes the target.
const tiers = [
  { actual: 0.6, name: "Enterprise", sla: 1 },
  { actual: 3.4, name: "Business", sla: 4 },
  { actual: 27, name: "Starter", sla: 24 },
];

export default function SlaVsTarget() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">First response vs SLA</div>
      <ul className="mt-4 grid gap-5">
        {tiers.map((t) => {
          const breached = t.actual > t.sla;
          return (
            <li className="grid gap-1.5" key={t.name}>
              <div className="flex justify-between text-sm">
                <span>{t.name}</span>
                <span
                  className={
                    breached
                      ? "text-destructive-foreground tabular-nums"
                      : "text-muted-foreground tabular-nums"
                  }
                >
                  {t.actual}h / {t.sla}h SLA
                </span>
              </div>
              <BulletChart
                aria-label={`${t.name}: ${t.actual} hours, SLA ${t.sla} hours${breached ? ", breached" : ""}`}
                color={breached ? "var(--destructive)" : "var(--success)"}
                max={t.sla * 1.5}
                ranges={[t.sla, t.sla * 1.5]}
                target={t.sla}
                value={t.actual}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
