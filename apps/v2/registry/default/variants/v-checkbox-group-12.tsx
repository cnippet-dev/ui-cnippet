"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const DAYS = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

const WEEKDAYS = DAYS.slice(0, 5).map((d) => d.id);
const WEEKEND = DAYS.slice(5).map((d) => d.id);

export function Pattern() {
  const [value, setValue] = useState<string[]>(WEEKDAYS);

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Recurring schedule</p>
        <Badge size="sm" variant="secondary">
          {value.length} days/wk
        </Badge>
      </div>
      <CheckboxGroup
        allValues={DAYS.map((d) => d.id)}
        onValueChange={setValue}
        value={value}
      >
        <Label className="font-medium text-muted-foreground text-sm">
          <Checkbox parent />
          Select all
        </Label>
        <div className="mt-1 ml-1 space-y-1 border-l pl-4">
          <Label className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            <Checkbox parent partialValues={WEEKDAYS} />
            Weekdays
          </Label>
          {DAYS.slice(0, 5).map((d) => (
            <Label className="ms-5 text-sm" key={d.id}>
              <Checkbox value={d.id} />
              {d.label}
            </Label>
          ))}
          <Label className="mt-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
            <Checkbox parent partialValues={WEEKEND} />
            Weekend
          </Label>
          {DAYS.slice(5).map((d) => (
            <Label className="ms-5 text-sm" key={d.id}>
              <Checkbox value={d.id} />
              {d.label}
            </Label>
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
}
