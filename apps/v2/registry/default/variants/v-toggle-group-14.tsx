"use client";

import {
  CaseSensitiveIcon,
  FilterIcon,
  SortAscIcon,
  WrapTextIcon,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/registry/default/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export function Pattern() {
  const [activeOptions, setActiveOptions] = useState<string[]>(["wrap"]);

  const isActive = (id: string) => activeOptions.includes(id);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="rounded-lg border border-border">
        <div className="flex items-center gap-1 border-border border-b bg-muted/30 px-2 py-1">
          <ToggleGroup
            className="gap-0"
            onValueChange={setActiveOptions}
            type="multiple"
            value={activeOptions}
          >
            <ToggleGroupItem
              aria-label="Toggle word wrap"
              size="sm"
              value="wrap"
            >
              <WrapTextIcon className="size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Toggle case-sensitive search"
              size="sm"
              value="case"
            >
              <CaseSensitiveIcon className="size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Toggle filters"
              size="sm"
              value="filter"
            >
              <FilterIcon className="size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Toggle sort ascending"
              size="sm"
              value="sort"
            >
              <SortAscIcon className="size-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Separator className="mx-1 h-4" orientation="vertical" />
          <span className="text-muted-foreground text-xs">
            {activeOptions.length} active
          </span>
        </div>
        <div className="space-y-1.5 p-3">
          {[
            "src/components/Button.tsx",
            "src/components/Input.tsx",
            "src/components/Badge.tsx",
            "src/hooks/useForm.ts",
          ].map((file) => (
            <div
              className="flex items-center gap-2 text-muted-foreground text-xs"
              key={file}
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {file}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-muted-foreground text-xs">
        {isActive("wrap") && "Word wrap on · "}
        {isActive("case") && "Case sensitive · "}
        {isActive("filter") && "Filtered · "}
        {isActive("sort") && "Sorted asc"}
        {activeOptions.length === 0 && "No options active"}
      </p>
    </div>
  );
}
