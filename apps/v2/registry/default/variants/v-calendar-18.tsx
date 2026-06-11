"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();

const TIME_OFF_TYPES = ["Vacation", "Sick Leave", "Personal", "Work From Home"];

export default function Particle() {
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [type, setType] = React.useState("Vacation");
  const [submitted, setSubmitted] = React.useState(false);

  const days =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1
      : null;

  function handleSubmit() {
    if (!range?.from || !range?.to) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRange(undefined);
    }, 2500);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {TIME_OFF_TYPES.map((t) => (
          <button
            className={`rounded-full border px-3 py-0.5 font-medium text-xs transition-colors ${
              type === t
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:border-foreground/30"
            }`}
            key={t}
            onClick={() => setType(t)}
            type="button"
          >
            {t}
          </button>
        ))}
      </div>
      <Calendar
        disabled={{ before: today }}
        mode="range"
        onSelect={setRange}
        selected={range}
      />
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {days
            ? `${days} day${days !== 1 ? "s" : ""} · ${type}`
            : "Select dates"}
        </span>
        <Button
          disabled={!range?.from || !range?.to || submitted}
          onClick={handleSubmit}
          size="sm"
        >
          {submitted ? "Submitted!" : "Request Time Off"}
        </Button>
      </div>
    </div>
  );
}
