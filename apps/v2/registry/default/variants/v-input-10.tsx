// title: With Date Type
"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export function Pattern() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-date">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          id="input-demo-date"
          render={
            <Button
              className="w-full justify-start font-normal data-[empty=true]:text-muted-foreground"
              data-empty={!date}
              variant="outline"
            />
          }
        >
          <CalendarIcon aria-hidden="true" />
          {date ? format(date, "PPP") : "Pick a date"}
        </PopoverTrigger>
        <PopoverPopup align="start">
          <Calendar
            defaultMonth={date}
            mode="single"
            onSelect={setDate}
            selected={date}
          />
        </PopoverPopup>
      </Popover>
    </Field>
  );
}
