"use client";

import { format, subYears } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const today = new Date();
const MIN_AGE = 18;
const MAX_AGE = 100;

const minDate = subYears(today, MAX_AGE);
const maxDate = subYears(today, MIN_AGE);

export default function Particle() {
  const [dob, setDob] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const age = dob
    ? Math.floor(
        (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
      )
    : null;

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="space-y-1">
        <p className="font-medium text-sm">Date of birth</p>
        <p className="text-muted-foreground text-xs">
          You must be 18–100 years old to register.
        </p>
      </div>

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={
            <Button className="w-full justify-between" variant="outline" />
          }
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {dob ? format(dob, "MMMM d, yyyy") : "Select your birthday"}
          </span>
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            captionLayout="dropdown"
            disabled={[{ before: minDate }, { after: maxDate }]}
            endMonth={maxDate}
            mode="single"
            onSelect={(d) => {
              setDob(d);
              if (d) setOpen(false);
            }}
            selected={dob}
            startMonth={minDate}
          />
        </PopoverPopup>
      </Popover>

      {age !== null && (
        <p className="rounded-md border border-dashed px-3 py-2 text-muted-foreground text-xs">
          Age:{" "}
          <span className="font-semibold text-foreground">{age} years old</span>
        </p>
      )}
    </div>
  );
}
