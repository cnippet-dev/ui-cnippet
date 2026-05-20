"use client";

import * as React from "react";
import type { CalendarDay, Modifiers } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();

type EventType = "meeting" | "deadline" | "holiday";

const events: Record<string, EventType> = {
  [new Date(y, m, 3).toDateString()]: "meeting",
  [new Date(y, m, 7).toDateString()]: "deadline",
  [new Date(y, m, 10).toDateString()]: "meeting",
  [new Date(y, m, 14).toDateString()]: "holiday",
  [new Date(y, m, 17).toDateString()]: "meeting",
  [new Date(y, m, 21).toDateString()]: "deadline",
  [new Date(y, m, 24).toDateString()]: "meeting",
  [new Date(y, m, 28).toDateString()]: "meeting",
};

const dotColor: Record<EventType, string> = {
  deadline: "bg-red-500",
  holiday: "bg-amber-500",
  meeting: "bg-blue-500",
};

interface DayButtonProps extends React.ComponentProps<"button"> {
  day: CalendarDay;
  modifiers: Modifiers;
}

function EventDayButton({
  day,
  modifiers,
  children,
  ...buttonProps
}: DayButtonProps) {
  const eventType = events[day.date.toDateString()];
  return (
    <button {...buttonProps}>
      {children}
      {eventType && (
        <span
          className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full ${dotColor[eventType]}`}
        />
      )}
    </button>
  );
}

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        components={{ DayButton: EventDayButton }}
        mode="single"
        onSelect={setDate}
        selected={date}
      />
      <div className="flex items-center justify-center gap-5 text-muted-foreground text-xs">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-blue-500" />
          Meeting
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-500" />
          Deadline
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-amber-500" />
          Holiday
        </span>
      </div>
    </div>
  );
}
