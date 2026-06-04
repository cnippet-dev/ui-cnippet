"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/default/ui/combobox";

interface Sprint {
  label: string;
  value: string;
  status: "active" | "upcoming" | "completed";
  dates: string;
}

const sprints: Sprint[] = [
  { dates: "Jun 2–15", label: "Sprint 24", status: "active", value: "s24" },
  { dates: "Jun 16–29", label: "Sprint 25", status: "upcoming", value: "s25" },
  {
    dates: "Jun 30–Jul 13",
    label: "Sprint 26",
    status: "upcoming",
    value: "s26",
  },
  {
    dates: "May 19–Jun 1",
    label: "Sprint 23",
    status: "completed",
    value: "s23",
  },
  { dates: "May 5–18", label: "Sprint 22", status: "completed", value: "s22" },
];

const statusVariant: Record<
  Sprint["status"],
  "success" | "info" | "secondary"
> = {
  active: "success",
  completed: "secondary",
  upcoming: "info",
};

export default function Particle() {
  const [value, setValue] = useState<Sprint | null>(sprints[0] ?? null);

  return (
    <Combobox
      items={sprints}
      onValueChange={(v) => setValue(v as Sprint | null)}
      value={value}
    >
      <ComboboxTrigger
        render={
          <Button
            className="w-full max-w-xs justify-between font-normal"
            variant="outline"
          />
        }
      >
        <ComboboxValue placeholder="Select sprint..." />
        <ChevronsUpDownIcon className="-me-1!" />
      </ComboboxTrigger>
      <ComboboxPopup className="w-64">
        <ComboboxInput placeholder="Search sprints..." showTrigger={false} />
        <ComboboxEmpty>No sprints found.</ComboboxEmpty>
        <ComboboxList>
          {(sprint: Sprint) => (
            <ComboboxItem
              className="**:data-check:ms-auto"
              key={sprint.value}
              value={sprint}
            >
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm">{sprint.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    {sprint.dates}
                  </span>
                  <Badge size="sm" variant={statusVariant[sprint.status]}>
                    {sprint.status}
                  </Badge>
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
