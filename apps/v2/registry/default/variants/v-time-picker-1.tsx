// title: Appointment slot with booked times disabled
"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Label } from "@/registry/default/ui/label";
import { formatTime, TimePicker } from "@/registry/default/ui/time-picker";

// Slots already taken on the chosen day.
const BOOKED = new Set(["10:00", "10:30", "13:00", "15:30"]);

export default function Particle() {
  const [time, setTime] = useState<string | null>("11:00");

  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border p-5">
      <div>
        <p className="font-medium text-sm">Book a demo</p>
        <p className="text-muted-foreground text-xs">
          Thursday, Oct 22 · 30 minutes · times in PT
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="demo-time">Start time</Label>
        <TimePicker
          className="w-full"
          id="demo-time"
          isTimeDisabled={(t) => BOOKED.has(t)}
          max="16:30"
          min="09:00"
          onValueChange={setTime}
          value={time}
        />
        <p className="text-muted-foreground text-xs">
          Greyed-out times are already booked.
        </p>
      </div>
      <Button disabled={!time}>
        {time ? `Confirm ${formatTime(time)}` : "Pick a time"}
      </Button>
    </div>
  );
}
