"use client";

import { CheckIcon } from "lucide-react";
import type * as React from "react";
import type { CalendarDay, Modifiers } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

const completedDays = new Set(
  [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20].map((d) =>
    new Date(y, m, d).toDateString(),
  ),
);

interface DayButtonProps extends React.ComponentProps<"button"> {
  day: CalendarDay;
  modifiers: Modifiers;
}

function HabitDayButton({
  day,
  modifiers,
  children,
  ...props
}: DayButtonProps) {
  const done = completedDays.has(day.date.toDateString());
  const isFuture = day.date > today;
  return (
    <button
      {...props}
      className={[
        props.className,
        done && !modifiers.selected
          ? "relative bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {done && !isFuture && (
        <CheckIcon className="absolute right-0.5 bottom-0.5 size-2.5 text-emerald-500" />
      )}
    </button>
  );
}

export default function Particle() {
  const streak = [...completedDays].filter((d) => new Date(d) <= today).length;

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        components={{ DayButton: HabitDayButton }}
        disabled={{ after: today }}
        mode="single"
        onSelect={() => {}}
        selected={undefined}
      />
      <div className="flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm">
        <span className="text-muted-foreground">Days completed this month</span>
        <span className="font-semibold">
          {streak} / {today.getDate()}
        </span>
      </div>
    </div>
  );
}
