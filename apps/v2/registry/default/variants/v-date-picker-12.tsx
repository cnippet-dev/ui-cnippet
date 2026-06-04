"use client";

import { format } from "date-fns";
import { CalendarIcon, RepeatIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

type Recurrence = "none" | "daily" | "weekly" | "monthly";

const OPTIONS: { id: Recurrence; label: string }[] = [
  { id: "none", label: "Does not repeat" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();
  const [recurrence, setRecurrence] = useState<Recurrence>("none");
  const [open, setOpen] = useState(false);

  const summaryParts = [
    date ? format(date, "EEE, MMM d, yyyy") : null,
    recurrence !== "none"
      ? OPTIONS.find((o) => o.id === recurrence)?.label
      : null,
  ].filter(Boolean);

  return (
    <div className="w-full max-w-xs space-y-3">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon />
          {date ? format(date, "MMM d, yyyy") : "Pick a date"}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={{ before: new Date() }}
            mode="single"
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
            selected={date}
          />
        </PopoverPopup>
      </Popover>

      <div className="flex items-center gap-2">
        <RepeatIcon className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex flex-wrap gap-1.5">
          {OPTIONS.map((opt) => (
            <button
              className={`rounded-full border px-3 py-0.5 font-medium text-xs transition-colors ${
                recurrence === opt.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:border-foreground/30"
              }`}
              key={opt.id}
              onClick={() => setRecurrence(opt.id)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {summaryParts.length > 0 && (
        <p className="text-muted-foreground text-xs">
          Scheduled:{" "}
          <span className="font-medium text-foreground">
            {summaryParts.join(" · ")}
          </span>
        </p>
      )}
    </div>
  );
}
