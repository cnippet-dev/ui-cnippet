"use client";

import * as React from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();

const SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const BOOKED: Record<string, string[]> = {
  [new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  ).toDateString()]: ["10:00 AM", "2:00 PM"],
  [new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2,
  ).toDateString()]: ["9:00 AM", "1:00 PM", "3:00 PM"],
};

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>();
  const [slot, setSlot] = React.useState<string | undefined>();
  const [confirmed, setConfirmed] = React.useState(false);

  const booked = date ? (BOOKED[date.toDateString()] ?? []) : [];

  function handleConfirm() {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setDate(undefined);
      setSlot(undefined);
    }, 2500);
  }

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        disabled={{ before: today }}
        mode="single"
        onSelect={(d) => {
          setDate(d);
          setSlot(undefined);
        }}
        selected={date}
      />
      {date && (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">
            Available slots for{" "}
            <span className="font-medium text-foreground">
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {SLOTS.map((s) => {
              const isBooked = booked.includes(s);
              return (
                <button
                  className={`rounded-md border px-2 py-1.5 font-medium text-xs transition-colors ${
                    isBooked
                      ? "cursor-not-allowed border-dashed text-muted-foreground/40"
                      : slot === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-foreground hover:border-foreground/30"
                  }`}
                  disabled={isBooked}
                  key={s}
                  onClick={() => setSlot(s)}
                  type="button"
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {slot && (
                <Badge variant="secondary">
                  {date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  · {slot}
                </Badge>
              )}
            </div>
            <Button
              disabled={!slot || confirmed}
              onClick={handleConfirm}
              size="sm"
            >
              {confirmed ? "Booked!" : "Book Slot"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
