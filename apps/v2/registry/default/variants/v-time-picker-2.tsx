// title: Start and end time with duration
"use client";

import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { TimePicker } from "@/registry/default/ui/time-picker";

const STEP = 15;

function addMinutes(time: string, minutes: number) {
  const [h = 0, m = 0] = time.split(":").map(Number);
  const total = Math.min(h * 60 + m + minutes, 23 * 60 + 45);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function duration(start: string, end: string) {
  const [sh = 0, sm = 0] = start.split(":").map(Number);
  const [eh = 0, em = 0] = end.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  return [h && `${h} h`, mins % 60 && `${mins % 60} min`]
    .filter(Boolean)
    .join(" ");
}

export default function Particle() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:30");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="shift-start">From</Label>
          <TimePicker
            id="shift-start"
            onValueChange={(next) => {
              if (!next) return;
              setStart(next);
              // Keep the end after the start.
              if (end <= next) setEnd(addMinutes(next, 60));
            }}
            step={STEP}
            value={start}
          />
        </div>
        <ArrowRightIcon
          aria-hidden="true"
          className="mb-2 size-4 text-muted-foreground"
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="shift-end">To</Label>
          <TimePicker
            id="shift-end"
            min={addMinutes(start, STEP)}
            onValueChange={(next) => next && setEnd(next)}
            step={STEP}
            value={end}
          />
        </div>
      </div>
      <p className="text-muted-foreground text-xs">
        Duration:{" "}
        <span className="text-foreground">{duration(start, end)}</span>
      </p>
    </div>
  );
}
