"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function nightsBetween(a: Date, b: Date) {
  return Math.round(Math.abs(b.getTime() - a.getTime()) / 86_400_000);
}

export default function Particle() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  const nights =
    range?.from && range?.to ? nightsBetween(range.from, range.to) : 0;

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="range"
        numberOfMonths={2}
        onSelect={setRange}
        selected={range}
      />
      <div className="rounded-lg border px-4 py-3 text-sm">
        {range?.from ? (
          <p className="flex flex-wrap items-center gap-1.5">
            <span>{formatShort(range.from)}</span>
            <span className="text-muted-foreground">→</span>
            {range.to ? (
              <>
                <span>{formatShort(range.to)}</span>
                {nights > 0 && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                    {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">pick end date</span>
            )}
          </p>
        ) : (
          <p className="text-muted-foreground">Select a check-in date.</p>
        )}
      </div>
    </div>
  );
}
