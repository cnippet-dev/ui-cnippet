"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Particle() {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);

  const sorted = [...(dates ?? [])].sort((a, b) => a.getTime() - b.getTime());

  return (
    <div className="flex flex-col gap-4">
      <Calendar mode="multiple" onSelect={setDates} selected={dates} />
      <div className="min-h-12 rounded-lg border border-dashed px-4 py-3">
        {sorted.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-muted-foreground text-xs">
              {sorted.length} date{sorted.length !== 1 ? "s" : ""} selected
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {sorted.map((d) => (
                <li
                  className="rounded-md bg-secondary px-2 py-0.5 font-medium text-xs"
                  key={d.toISOString()}
                >
                  {d.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Click any day to select multiple dates.
          </p>
        )}
      </div>
    </div>
  );
}
