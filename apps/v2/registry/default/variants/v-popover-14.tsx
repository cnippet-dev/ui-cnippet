"use client";

import { CalendarIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const reminders = [
  { description: "Quick follow-up", label: "In 30 minutes" },
  { description: "Later today", label: "In 1 hour" },
  { description: "9:00 AM", label: "Tomorrow morning" },
  { description: "Monday, 9:00 AM", label: "Next week" },
] as const;

export function Pattern() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <ClockIcon aria-hidden="true" />
          Remind me
          {selected && (
            <Badge className="ml-0.5 h-4 px-1 text-[10px]" variant="secondary">
              1
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverContent align="center" className="w-64 gap-0 p-0" side="top">
          <div className="border-b px-0 py-3">
            <h4 className="font-semibold text-sm">Set a Reminder</h4>
            <p className="mt-0.5 text-muted-foreground text-xs">
              We'll notify you at the right time.
            </p>
          </div>
          <div className="space-y-1 py-2">
            {reminders.map(({ label, description }) => (
              <button
                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted ${
                  selected === label ? "bg-muted ring-1 ring-ring/40" : ""
                }`}
                key={label}
                onClick={() => setSelected(label)}
              >
                <ClockIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium leading-none">{label}</p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {description}
                  </p>
                </div>
                {selected === label && (
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t px-0 py-2.5">
            <button className="flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground">
              <CalendarIcon aria-hidden="true" className="size-3.5 shrink-0" />
              Pick a custom date &amp; time
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
