"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();
today.setHours(0, 0, 0, 0);

// Simulate fully-booked dates
const y = today.getFullYear();
const m = today.getMonth();
const bookedDates = [
  new Date(y, m, 8),
  new Date(y, m, 9),
  new Date(y, m, 15),
  new Date(y, m, 22),
  new Date(y, m + 1, 5),
  new Date(y, m + 1, 12),
];

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        disabled={[{ before: today }, { dayOfWeek: [0, 6] }, ...bookedDates]}
        mode="single"
        onSelect={setDate}
        selected={date}
      />
      <div className="rounded-lg border px-4 py-3 text-sm">
        {date ? (
          <p>
            Appointment:{" "}
            <span className="font-semibold">
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                weekday: "long",
              })}
            </span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Weekdays only · Greyed-out dates are fully booked.
          </p>
        )}
      </div>
    </div>
  );
}
