"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Variant() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1" htmlFor="date">
        Date of birth
      </Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={
            <Button
              className="w-48 justify-between font-normal"
              id="date"
              variant="outline"
            />
          }
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverPopup align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            captionLayout="dropdown"
            mode="single"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            selected={date}
          />
        </PopoverPopup>
      </Popover>
    </div>
  );
}
