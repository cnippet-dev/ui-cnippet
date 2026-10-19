// title: 24-hour quiet hours with a switch
"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";
import { TimePicker } from "@/registry/default/ui/time-picker";

export default function Particle() {
  const [enabled, setEnabled] = useState(true);
  const [from, setFrom] = useState<string | null>("22:00");
  const [to, setTo] = useState<string | null>("07:00");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label htmlFor="quiet-hours">Quiet hours</Label>
          <p className="text-muted-foreground text-xs">
            Pause non-urgent alerts overnight. 24-hour time, server timezone.
          </p>
        </div>
        <Switch
          checked={enabled}
          id="quiet-hours"
          onCheckedChange={setEnabled}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="quiet-from">Starts</Label>
          <TimePicker
            className="w-full"
            disabled={!enabled}
            hourCycle={24}
            id="quiet-from"
            onValueChange={setFrom}
            step={60}
            value={from}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="quiet-to">Ends</Label>
          <TimePicker
            className="w-full"
            disabled={!enabled}
            hourCycle={24}
            id="quiet-to"
            onValueChange={setTo}
            step={60}
            value={to}
          />
        </div>
      </div>
    </div>
  );
}
