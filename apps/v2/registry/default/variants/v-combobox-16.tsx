"use client";

import { ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react";
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

interface Status {
  label: string;
  value: string;
  color: string;
}

const statuses: Status[] = [
  { color: "bg-slate-400", label: "Backlog", value: "backlog" },
  { color: "bg-blue-400", label: "Todo", value: "todo" },
  { color: "bg-amber-400", label: "In Progress", value: "in-progress" },
  { color: "bg-violet-400", label: "In Review", value: "in-review" },
  { color: "bg-emerald-400", label: "Done", value: "done" },
  { color: "bg-red-400", label: "Cancelled", value: "cancelled" },
];

export default function Particle() {
  const [value, setValue] = useState<Status | null>(statuses[0] ?? null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Current status:</span>
        {value ? (
          <Badge className="gap-1.5" variant="outline">
            <span className={`size-2 rounded-full ${value.color}`} />
            {value.label}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">None</span>
        )}
      </div>

      <div className="flex gap-2">
        <Combobox
          items={statuses}
          onValueChange={(v) => setValue(v as Status | null)}
          value={value}
        >
          <ComboboxTrigger
            render={
              <Button
                className="flex-1 justify-between font-normal"
                variant="outline"
              />
            }
          >
            {value ? (
              <span className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${value.color}`} />
                <ComboboxValue />
              </span>
            ) : (
              <ComboboxValue placeholder="Set status..." />
            )}
            <ChevronsUpDownIcon className="-me-1!" />
          </ComboboxTrigger>
          <ComboboxPopup aria-label="Set status">
            <div className="border-b p-2">
              <ComboboxInput
                className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
                placeholder="Search status..."
                showTrigger={false}
                startAddon={<SearchIcon />}
              />
            </div>
            <ComboboxEmpty>No status found.</ComboboxEmpty>
            <ComboboxList>
              {(status: Status) => (
                <ComboboxItem key={status.value} value={status}>
                  <span className={`size-2 rounded-full ${status.color}`} />
                  {status.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>

        <Button
          aria-label="Clear status"
          disabled={!value}
          onClick={() => setValue(null)}
          size="icon"
          variant="ghost"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
