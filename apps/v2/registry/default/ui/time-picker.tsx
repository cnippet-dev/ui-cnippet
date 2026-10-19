"use client";

import { ClockIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

/** "HH:mm" (24-hour) → minutes since midnight. */
function toMinutes(time: string): number {
  const [h = 0, m = 0] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Formats an "HH:mm" value for display, e.g. "14:30" → "2:30 PM". */
export function formatTime(time: string, hourCycle: 12 | 24 = 12): string {
  const total = toMinutes(time);
  const h = Math.floor(total / 60);
  const m = String(total % 60).padStart(2, "0");
  if (hourCycle === 24) return `${String(h).padStart(2, "0")}:${m}`;
  return `${h % 12 || 12}:${m} ${h < 12 ? "AM" : "PM"}`;
}

/** Every `step` minutes from `min` to `max`, inclusive, as "HH:mm" values. */
export function getTimeSlots(
  step = 30,
  min = "00:00",
  max = "23:59",
): string[] {
  const slots: string[] = [];
  for (let t = toMinutes(min); t <= toMinutes(max); t += step) {
    slots.push(fromMinutes(t));
  }
  return slots;
}

export interface TimePickerProps
  extends Omit<
    React.ComponentProps<typeof SelectTrigger>,
    "value" | "defaultValue" | "onChange"
  > {
  /** "HH:mm" in 24-hour time, like `<input type="time">`. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Minutes between options. */
  step?: number;
  min?: string;
  max?: string;
  hourCycle?: 12 | 24;
  /** Return true to show a time but block picking it, e.g. a booked slot. */
  isTimeDisabled?: (time: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

export function TimePicker({
  value,
  defaultValue,
  onValueChange,
  step = 30,
  min = "00:00",
  max = "23:59",
  hourCycle = 12,
  isTimeDisabled,
  placeholder = "Select a time",
  disabled,
  name,
  className,
  ...props
}: TimePickerProps): React.ReactElement {
  const items = React.useMemo(
    () =>
      getTimeSlots(step, min, max).map((slot) => ({
        label: formatTime(slot, hourCycle),
        value: slot,
      })),
    [step, min, max, hourCycle],
  );

  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      items={items}
      name={name}
      onValueChange={(next) => onValueChange?.(next as string | null)}
      value={value}
    >
      <SelectTrigger className={cn("w-40", className)} {...props}>
        <ClockIcon aria-hidden="true" className="size-4 opacity-72" />
        <SelectValue className="tabular-nums" placeholder={placeholder} />
      </SelectTrigger>
      <SelectPopup className="max-h-[min(18rem,var(--available-height))]">
        {items.map((item) => (
          <SelectItem
            className="tabular-nums"
            disabled={isTimeDisabled?.(item.value)}
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
