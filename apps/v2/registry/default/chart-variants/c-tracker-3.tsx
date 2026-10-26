"use client";

import { Tracker } from "@/registry/default/charts/tracker";

// Four weeks of habits, Monday first. 1 = done, 0 = missed.
const habits = [
  { done: "1101110111011111011101111111", name: "Run 5K" },
  { done: "1111111111111011111111111111", name: "Read 20 min" },
  { done: "0100100010010001001000100100", name: "Meditate" },
];

export default function HabitTracker() {
  return (
    <div className="grid w-full max-w-md gap-4 rounded-lg border bg-card p-5">
      {habits.map((h) => {
        const count = h.done.split("").filter((d) => d === "1").length;
        return (
          <div key={h.name}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>{h.name}</span>
              <span className="text-muted-foreground tabular-nums">
                {count}/28 days
              </span>
            </div>
            <Tracker
              aria-label={`${h.name}, last 28 days`}
              className="h-5"
              data={h.done.split("").map((d, i) => ({
                color: d === "1" ? "var(--chart-2)" : undefined,
                key: String(i),
                tooltip: `Day ${i + 1} — ${d === "1" ? "Done" : "Missed"}`,
              }))}
            />
          </div>
        );
      })}
    </div>
  );
}
