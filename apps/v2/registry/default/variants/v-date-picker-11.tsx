"use client";

import { addMonths, endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const today = new Date();
const PRESETS = [
  { from: startOfMonth(today), label: "This month", to: endOfMonth(today) },
  {
    from: startOfMonth(addMonths(today, 1)),
    label: "Next month",
    to: endOfMonth(addMonths(today, 1)),
  },
  { from: today, label: "Next 3 months", to: endOfMonth(addMonths(today, 2)) },
  { from: today, label: "Next 6 months", to: endOfMonth(addMonths(today, 5)) },
];

import type { DateRange } from "react-day-picker";

export default function Particle() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const label =
    range?.from && range?.to
      ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`
      : "Select report period";

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            className="rounded-full border px-3 py-0.5 font-medium text-muted-foreground text-xs transition-colors hover:border-foreground/30 hover:text-foreground"
            key={p.label}
            onClick={() => {
              setRange({ from: p.from, to: p.to });
              setOpen(false);
            }}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon />
          {label}
          {range?.from && range?.to && (
            <Badge className="ml-auto" size="sm" variant="secondary">
              {Math.round(
                (range.to.getTime() - range.from.getTime()) / 86400000,
              ) + 1}
              d
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            mode="range"
            numberOfMonths={2}
            onSelect={setRange}
            selected={range}
          />
          <div className="flex justify-end gap-2 border-t p-3">
            <Button
              onClick={() => {
                setRange(undefined);
                setOpen(false);
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
              Apply
            </Button>
          </div>
        </PopoverPopup>
      </Popover>
    </div>
  );
}
