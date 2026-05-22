"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "4:00 PM",
];

const BOOKED_BY_DOW: Record<number, string[]> = {
  1: ["9:00 AM", "10:30 AM", "3:00 PM"],
  2: ["9:30 AM", "2:00 PM"],
  3: ["11:00 AM", "4:00 PM"],
  4: ["9:00 AM", "2:30 PM", "3:00 PM"],
  5: ["10:00 AM"],
};

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    setSelectedSlot(undefined);
  };

  const booked = date ? (BOOKED_BY_DOW[date.getDay()] ?? []) : [];

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-center gap-3 border-b pb-4">
        <Avatar className="size-11">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm">Dr. Sarah Chen</p>
          <p className="text-muted-foreground text-xs">
            Cardiologist · NYC Health
          </p>
        </div>
        <Badge variant="success">Available</Badge>
      </div>

      <Popover>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon aria-hidden="true" />
          {date ? format(date, "EEE, MMM dd, yyyy") : "Select a date"}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
            mode="single"
            onSelect={handleDateSelect}
            selected={date}
          />
        </PopoverPopup>
      </Popover>

      {date && (
        <div>
          <p className="mb-2 font-medium text-muted-foreground text-xs">
            Available slots for {format(date, "MMM dd")}
          </p>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => {
              const isBooked = booked.includes(slot);
              return (
                <button
                  className={cn(
                    "rounded-md border px-3 py-1 font-medium text-xs transition-colors",
                    isBooked
                      ? "cursor-not-allowed border-transparent bg-muted text-muted-foreground/40 line-through"
                      : selectedSlot === slot
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:bg-accent",
                  )}
                  disabled={isBooked}
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  type="button"
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button className="w-full" disabled={!date || !selectedSlot}>
        {selectedSlot && date
          ? `Book · ${format(date, "MMM dd")} at ${selectedSlot}`
          : "Book Appointment"}
      </Button>
    </div>
  );
}
