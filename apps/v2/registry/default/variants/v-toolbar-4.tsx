"use client";

import {
  Columns3Icon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
} from "@/registry/default/ui/toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const iconActions = [
  { icon: FilterIcon, label: "Filter rows" },
  { icon: Columns3Icon, label: "Manage columns" },
  { icon: DownloadIcon, label: "Export CSV" },
  { icon: TrashIcon, label: "Delete selected" },
] as const;

export function Pattern() {
  const [query, setQuery] = useState("");

  return (
    <TooltipProvider>
      <Toolbar className="w-full max-w-lg">
        <ToolbarGroup className="flex-1">
          <div className="relative flex items-center">
            <SearchIcon className="pointer-events-none absolute left-2 size-3.5 text-muted-foreground" />
            <ToolbarInput
              className="h-7 w-full rounded-md border bg-transparent py-1 pr-2 pl-7 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rows…"
              value={query}
            />
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {iconActions.map(({ icon: Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label={label}
                    render={<Button size="icon" variant="ghost" />}
                  >
                    <Icon />
                  </ToolbarButton>
                }
              />
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <ToolbarButton render={<Button size="sm" />}>
            <PlusIcon className="size-3.5" />
            Add row
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
