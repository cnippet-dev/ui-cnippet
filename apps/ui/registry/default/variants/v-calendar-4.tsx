"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverPopup } from "@/components/ui/popover";

export default function Variant() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            />
          }
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverPopup className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverPopup>
      </Popover>
    </div>
  );
}
