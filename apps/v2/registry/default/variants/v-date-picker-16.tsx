"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const triggerClass =
  "w-full justify-start font-normal data-[empty=true]:text-muted-foreground";

function formatRange(range: DateRange | undefined) {
  if (!range?.from) return "Pick a date range";
  if (!range.to) return format(range.from, "LLL d, y");
  return `${format(range.from, "LLL d")} – ${format(range.to, "LLL d, y")}`;
}

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [birthday, setBirthday] = useState<Date | undefined>();

  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>Due date</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                className={triggerClass}
                data-empty={!date}
                variant="outline"
              />
            }
          >
            <CalendarIcon aria-hidden="true" />
            {date ? format(date, "PPP") : "Pick a date"}
          </PopoverTrigger>
          <PopoverPopup align="start">
            <Calendar mode="single" onSelect={setDate} selected={date} />
          </PopoverPopup>
        </Popover>
      </Field>
      <Field>
        <FieldLabel>Trip dates</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                className={triggerClass}
                data-empty={!range?.from}
                variant="outline"
              />
            }
          >
            <CalendarIcon aria-hidden="true" />
            {formatRange(range)}
          </PopoverTrigger>
          <PopoverPopup align="start">
            <Calendar
              defaultMonth={range?.from}
              mode="range"
              numberOfMonths={2}
              onSelect={setRange}
              selected={range}
            />
          </PopoverPopup>
        </Popover>
      </Field>
      <Field>
        <FieldLabel>Date of birth</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                className={triggerClass}
                data-empty={!birthday}
                variant="outline"
              />
            }
          >
            <CalendarIcon aria-hidden="true" />
            {birthday ? format(birthday, "PPP") : "Select your birth date"}
          </PopoverTrigger>
          <PopoverPopup align="start">
            <Calendar
              captionLayout="dropdown"
              defaultMonth={birthday ?? new Date(1995, 0)}
              endMonth={new Date()}
              mode="single"
              onSelect={setBirthday}
              selected={birthday}
              startMonth={new Date(1920, 0)}
            />
          </PopoverPopup>
        </Popover>
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <Button className={triggerClass} disabled variant="outline">
          <CalendarIcon aria-hidden="true" />
          Mar 4, 2027
        </Button>
      </Field>
    </div>
  );
}
