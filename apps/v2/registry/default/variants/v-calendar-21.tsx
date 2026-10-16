"use client";

import { addDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const today = new Date();
    return { from: addDays(today, 2), to: addDays(today, 6) };
  });

  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">Single date</span>
        <Calendar
          className="rounded-lg border"
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">
          Range with month and year dropdowns
        </span>
        <Calendar
          captionLayout="dropdown"
          className="rounded-lg border"
          endMonth={new Date(2030, 11)}
          mode="range"
          onSelect={setRange}
          selected={range}
          startMonth={new Date(2020, 0)}
        />
      </div>
    </div>
  );
}
