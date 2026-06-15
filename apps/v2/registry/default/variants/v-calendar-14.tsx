"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

const HOLIDAYS: Record<string, string> = {
  [new Date(new Date().getFullYear(), 0, 1).toDateString()]: "New Year's Day",
  [new Date(new Date().getFullYear(), 0, 20).toDateString()]: "MLK Day",
  [new Date(new Date().getFullYear(), 1, 17).toDateString()]: "Presidents' Day",
  [new Date(new Date().getFullYear(), 4, 26).toDateString()]: "Memorial Day",
  [new Date(new Date().getFullYear(), 6, 4).toDateString()]: "Independence Day",
  [new Date(new Date().getFullYear(), 8, 1).toDateString()]: "Labor Day",
  [new Date(new Date().getFullYear(), 10, 27).toDateString()]: "Thanksgiving",
  [new Date(new Date().getFullYear(), 11, 25).toDateString()]: "Christmas Day",
};

const holidayDates = Object.keys(HOLIDAYS).map((d) => new Date(d));

export default function Particle() {
  const [selected, setSelected] = React.useState<Date | undefined>();
  const label = selected ? HOLIDAYS[selected.toDateString()] : null;

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        disabled={[{ dayOfWeek: [0, 6] }]}
        mode="single"
        modifiers={{ holiday: holidayDates }}
        modifiersClassNames={{
          holiday: "text-rose-600 font-semibold dark:text-rose-400",
        }}
        onSelect={setSelected}
        selected={selected}
      />
      <div className="rounded-lg border px-4 py-2.5 text-sm">
        {label ? (
          <p>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              {label}
            </span>{" "}
            —{" "}
            {selected?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}
          </p>
        ) : (
          <p className="text-muted-foreground">
            Click a highlighted date to see the holiday name.
          </p>
        )}
      </div>
    </div>
  );
}
