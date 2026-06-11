"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const DURATIONS = [
  { label: "1 week", nights: 7 },
  { label: "2 weeks", nights: 14 },
  { label: "1 month", nights: 30 },
];

export default function Particle() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const today = new Date();

  const nights =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000)
      : null;

  return (
    <div className="w-full max-w-sm space-y-3 rounded-xl border bg-background p-4 shadow-sm">
      <p className="font-semibold text-sm">Plan your stay</p>

      <div className="flex gap-1.5">
        {DURATIONS.map((d) => (
          <button
            className="flex-1 rounded-md border py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:border-primary hover:text-primary"
            key={d.label}
            onClick={() =>
              setRange({ from: today, to: addDays(today, d.nights) })
            }
            type="button"
          >
            {d.label}
          </button>
        ))}
      </div>

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon />
          {range?.from && range?.to
            ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`
            : "Select check-in / check-out"}
          {nights && (
            <Badge className="ml-auto" size="sm" variant="secondary">
              {nights}n
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={{ before: today }}
            mode="range"
            numberOfMonths={2}
            onSelect={setRange}
            selected={range}
          />
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-muted-foreground text-xs">
              {nights
                ? `${nights} night${nights !== 1 ? "s" : ""}`
                : "Select dates"}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setRange(undefined);
                }}
                size="sm"
                variant="ghost"
              >
                Clear
              </Button>
              <Button
                disabled={!range?.from || !range?.to}
                onClick={() => setOpen(false)}
                size="sm"
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverPopup>
      </Popover>
    </div>
  );
}
