"use client";

import * as React from "react";
import type { DropdownProps } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

function CalendarDropdown(props: DropdownProps) {
  const { options, value, onChange, "aria-label": ariaLabel } = props;

  const handleValueChange = (newValue: string | null) => {
    if (onChange && newValue) {
      const syntheticEvent = {
        target: { value: newValue },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  const items =
    options?.map((option) => ({
      disabled: option.disabled,
      label: option.label,
      value: option.value.toString(),
    })) ?? [];

  return (
    <Select
      aria-label={ariaLabel}
      items={items}
      onValueChange={handleValueChange}
      value={value?.toString()}
    >
      <SelectTrigger className="min-w-none">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {items.map((item) => (
          <SelectItem
            disabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}

const today = new Date();
today.setHours(0, 0, 0, 0);

function calcAge(dob: Date): number {
  const diff = today.getTime() - dob.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>();

  const age = date ? calcAge(date) : null;

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        captionLayout="dropdown"
        components={{ Dropdown: CalendarDropdown }}
        defaultMonth={new Date(1990, 0)}
        disabled={{ after: today }}
        endMonth={today}
        mode="single"
        onSelect={setDate}
        selected={date}
        startMonth={new Date(1900, 0)}
      />
      <div className="rounded-lg border px-4 py-3 text-sm">
        {date && age !== null ? (
          <p>
            Date of birth:{" "}
            <span className="font-semibold">
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="ml-2 text-muted-foreground">
              ({age} years old)
            </span>
          </p>
        ) : (
          <p className="text-muted-foreground">Select your date of birth.</p>
        )}
      </div>
    </div>
  );
}
