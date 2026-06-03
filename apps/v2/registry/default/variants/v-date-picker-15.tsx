"use client";

import { format, isSameDay } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  const [dates, setDates] = useState<Date[]>([]);
  const [open, setOpen] = useState(false);
  const today = new Date();

  const toggleDate = (d: Date) => {
    setDates((prev) =>
      prev.some((p) => isSameDay(p, d))
        ? prev.filter((p) => !isSameDay(p, d))
        : [...prev, d].sort((a, b) => a.getTime() - b.getTime()),
    );
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="space-y-1">
        <p className="font-medium text-sm">Available days</p>
        <p className="text-muted-foreground text-xs">
          Select the days you are available for meetings.
        </p>
      </div>

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon />
          {dates.length === 0
            ? "Pick available days"
            : `${dates.length} day${dates.length !== 1 ? "s" : ""} selected`}
          {dates.length > 0 && (
            <Badge className="ml-auto" size="sm" variant="secondary">
              {dates.length}
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={{ before: today }}
            mode="multiple"
            onSelect={(days) => setDates(days ?? [])}
            selected={dates}
          />
          <div className="flex justify-end gap-2 border-t p-3">
            <Button onClick={() => setDates([])} size="sm" variant="ghost">
              Clear
            </Button>
            <Button onClick={() => setOpen(false)} size="sm">
              Done
            </Button>
          </div>
        </PopoverPopup>
      </Popover>

      {dates.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {dates.map((d) => (
            <span
              className="flex items-center gap-1 rounded-full border bg-muted px-2.5 py-0.5 font-medium text-xs"
              key={d.toISOString()}
            >
              {format(d, "MMM d")}
              <button
                aria-label={`Remove ${format(d, "MMM d")}`}
                className="rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => toggleDate(d)}
                type="button"
              >
                <XIcon className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
