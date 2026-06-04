"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Badge } from "@/registry/default/ui/badge";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();

function diffDays(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default function Particle() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  const duration =
    range?.from && range?.to ? diffDays(range.from, range.to) + 1 : null;

  const sprintNum = range?.from
    ? Math.ceil(
        (diffDays(new Date(today.getFullYear(), 0, 1), range.from) + 1) / 14,
      )
    : null;

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        disabled={{ before: today }}
        mode="range"
        numberOfMonths={2}
        onSelect={setRange}
        selected={range}
      />
      <div className="grid grid-cols-3 gap-2 rounded-lg border px-4 py-3 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Start</span>
          <span className="font-medium">
            {range?.from
              ? range.from.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              : "—"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">End</span>
          <span className="font-medium">
            {range?.to
              ? range.to.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              : "—"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs">Duration</span>
          <span className="font-medium">
            {duration ? (
              <span className="flex items-center gap-1.5">
                {duration}d
                {sprintNum && (
                  <Badge size="sm" variant="secondary">
                    S{sprintNum}
                  </Badge>
                )}
              </span>
            ) : (
              "—"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
