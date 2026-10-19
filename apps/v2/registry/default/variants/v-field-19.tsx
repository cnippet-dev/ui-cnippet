// title: Field with date picker
"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>();
  const today = new Date();

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor={id}>Date of birth</FieldLabel>
      <Popover>
        <PopoverTrigger
          id={id}
          render={
            <Button
              className="w-full justify-start font-normal data-[empty=true]:text-muted-foreground"
              data-empty={!date}
              variant="outline"
            />
          }
        >
          <CalendarIcon aria-hidden="true" />
          {date ? format(date, "PPP") : "Select your birth date"}
        </PopoverTrigger>
        <PopoverPopup align="start">
          <Calendar
            captionLayout="dropdown"
            defaultMonth={date ?? new Date(1995, 0)}
            disabled={{ after: today }}
            endMonth={today}
            mode="single"
            onSelect={setDate}
            selected={date}
            startMonth={new Date(1920, 0)}
          />
        </PopoverPopup>
      </Popover>
      <FieldDescription>Used to verify your age and identity.</FieldDescription>
    </Field>
  );
}
