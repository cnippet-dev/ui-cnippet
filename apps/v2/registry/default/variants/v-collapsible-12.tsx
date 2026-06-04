//biome-ignore-all lint/style/noNonNullAssertion:<>
"use client";

import { ChevronDownIcon, FilterIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

const FILTERS = [
  {
    id: "category",
    label: "Category",
    options: ["Design", "Engineering", "Marketing", "Operations"],
  },
  {
    id: "status",
    label: "Status",
    options: ["Active", "Paused", "Archived"],
  },
  {
    id: "priority",
    label: "Priority",
    options: ["High", "Medium", "Low"],
  },
];

export function Pattern() {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});

  const toggle = (group: string, opt: string) =>
    setSelected((prev) => {
      const next = { ...prev, [group]: new Set(prev[group] ?? []) };
      next[group]!.has(opt) ? next[group]!.delete(opt) : next[group]!.add(opt);
      return next;
    });

  const totalActive = Object.values(selected).reduce(
    (sum, s) => sum + s.size,
    0,
  );

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="size-4 text-muted-foreground" />
          <p className="font-semibold text-sm">Filters</p>
          {totalActive > 0 && <Badge size="sm">{totalActive}</Badge>}
        </div>
        {totalActive > 0 && (
          <button
            className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
            onClick={() => setSelected({})}
            type="button"
          >
            <XIcon className="size-3" />
            Clear all
          </button>
        )}
      </div>
      {FILTERS.map((f) => (
        <Collapsible defaultOpen key={f.id}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-sm transition-colors hover:text-primary">
            <span className="flex items-center gap-2">
              {f.label}
              {(selected[f.id]?.size ?? 0) > 0 && (
                <Badge size="sm" variant="secondary">
                  {selected[f.id]?.size}
                </Badge>
              )}
            </span>
            <ChevronDownIcon className="size-3.5 in-data-panel-open:rotate-180 text-muted-foreground transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="space-y-1.5 pb-3">
              {f.options.map((opt) => (
                <label
                  className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
                  key={opt}
                >
                  <Checkbox
                    checked={selected[f.id]?.has(opt) ?? false}
                    onCheckedChange={() => toggle(f.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </CollapsiblePanel>
        </Collapsible>
      ))}
      <Button className="w-full" size="sm">
        Apply filters
      </Button>
    </div>
  );
}
