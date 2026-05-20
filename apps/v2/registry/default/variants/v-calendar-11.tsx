"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";
import { Button } from "@/registry/default/ui/button";

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function nextWeekday(dayOfWeek: number): Date {
  const today = new Date();
  const diff = ((dayOfWeek - today.getDay() + 7) % 7) || 7;
  return addDays(today, diff);
}

const today = new Date();

const presets = [
  { label: "Today", date: today },
  { label: "Tomorrow", date: addDays(today, 1) },
  { label: "Next Monday", date: nextWeekday(1) },
  { label: "In 1 week", date: addDays(today, 7) },
  { label: "In 2 weeks", date: addDays(today, 14) },
  { label: "In 1 month", date: addDays(today, 30) },
];

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>(today);

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex flex-wrap gap-1.5 border-b bg-muted/40 px-3 py-2.5">
        {presets.map((p) => (
          <Button
            key={p.label}
            className="h-7 text-xs"
            onClick={() => setDate(p.date)}
            size="sm"
            variant={
              date?.toDateString() === p.date.toDateString()
                ? "default"
                : "outline"
            }
          >
            {p.label}
          </Button>
        ))}
      </div>
      <Calendar mode="single" onSelect={setDate} selected={date} />
      {date && (
        <div className="border-t px-4 py-2.5 text-center text-sm text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}
