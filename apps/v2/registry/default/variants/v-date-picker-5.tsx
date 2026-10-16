"use client";

import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [month, setMonth] = useState<Date>(() => new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const parsedDate = parse(value, "MM/dd/yyyy", new Date());
      if (value.length === 10 && isValid(parsedDate)) {
        setDate(parsedDate);
        setMonth(parsedDate);
      }
    } else {
      setDate(undefined);
    }
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setInputValue(format(selectedDate, "MM/dd/yyyy"));
      setMonth(selectedDate);
    } else {
      setInputValue("");
    }
  };

  return (
    <Popover>
      <InputGroup>
        <InputGroupInput
          aria-label="Date"
          inputMode="numeric"
          maxLength={10}
          onChange={handleInputChange}
          placeholder="MM/DD/YYYY"
          value={inputValue}
        />
        <InputGroupAddon>
          <PopoverTrigger
            aria-label="Open calendar"
            render={<Button size="icon-xs" variant="ghost" />}
          >
            <CalendarIcon aria-hidden="true" />
          </PopoverTrigger>
        </InputGroupAddon>
      </InputGroup>
      <PopoverPopup align="start" alignOffset={-4} sideOffset={8}>
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          onSelect={handleSelect}
          selected={date}
        />
      </PopoverPopup>
    </Popover>
  );
}
