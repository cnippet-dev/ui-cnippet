"use client";

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

type SortDir = "asc" | "desc" | "none";

const columns = ["Name", "Status", "Date", "Amount"];

export function Pattern() {
  const [sorts, setSorts] = useState<Record<string, SortDir>>({
    Amount: "none",
    Date: "asc",
    Name: "none",
    Status: "none",
  });

  const _sortIcon = (dir: SortDir) => {
    if (dir === "asc") return <ArrowUpIcon className="size-3.5" />;
    if (dir === "desc") return <ArrowDownIcon className="size-3.5" />;
    return <ArrowUpDownIcon className="size-3.5 opacity-40" />;
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-muted-foreground text-xs">
        Click a column header to cycle sort direction
      </p>
      {columns.map((col) => {
        const dir = sorts[col];
        return (
          <div
            className="flex items-center justify-between rounded-lg border border-input px-3 py-2"
            key={col}
          >
            <span className="text-sm">{col}</span>
            <ToggleGroup
              onValueChange={(v) => {
                const next: SortDir = (v[0] as SortDir) ?? "none";
                setSorts((prev) => ({ ...prev, [col]: next }));
              }}
              value={dir && dir !== "none" ? [dir] : []}
            >
              <ToggleGroupItem
                aria-label={`Sort ${col} ascending`}
                size="sm"
                value="asc"
              >
                <ArrowUpIcon className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                aria-label={`Sort ${col} descending`}
                size="sm"
                value="desc"
              >
                <ArrowDownIcon className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        );
      })}
    </div>
  );
}
