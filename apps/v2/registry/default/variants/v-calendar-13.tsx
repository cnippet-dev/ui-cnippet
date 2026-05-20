"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

// Snaps a date to the Monday–Sunday ISO week containing it.
function isoWeekRange(date: Date): DateRange {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const from = new Date(d);
  from.setDate(d.getDate() + diffToMonday);
  const to = new Date(from);
  to.setDate(from.getDate() + 6);
  return { from, to };
}

function formatWeekLabel(range: DateRange): string {
  const { from, to } = range;
  if (!from || !to) return "";
  const sameYear = from.getFullYear() === to.getFullYear();
  const sameMonth = sameYear && from.getMonth() === to.getMonth();
  const fromStr = from.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const toStr = to.toLocaleDateString("en-US", {
    day: "numeric",
    month: sameMonth ? undefined : "short",
    year: "numeric",
  });
  return `${fromStr} – ${toStr}`;
}

export default function Particle() {
  const [week, setWeek] = React.useState<DateRange>(isoWeekRange(new Date()));

  function handleSelect(range: DateRange | undefined) {
    // react-day-picker provides `from` as the newly clicked day;
    // snap the whole selection to that day's ISO week.
    if (range?.from) setWeek(isoWeekRange(range.from));
  }

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        ISOWeek
        mode="range"
        onSelect={handleSelect}
        selected={week}
        showWeekNumber
      />
      <div className="rounded-lg border px-4 py-3 text-sm">
        {week.from ? (
          <p>
            Week selected:{" "}
            <span className="font-semibold">{formatWeekLabel(week)}</span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Click any day to select its full week.
          </p>
        )}
      </div>
    </div>
  );
}
