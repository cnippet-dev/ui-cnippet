"use client";

import {
  LayoutGridIcon,
  LayoutListIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SortAscIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/registry/default/ui/toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const sortOptions = [
  { label: "Name A–Z", value: "name-asc" },
  { label: "Name Z–A", value: "name-desc" },
  { label: "Newest first", value: "date-desc" },
  { label: "Oldest first", value: "date-asc" },
];

export function Pattern() {
  const [view, setView] = useState("grid");

  return (
    <TooltipProvider>
      <Toolbar className="w-full max-w-lg flex-wrap gap-y-1">
        <ToolbarGroup>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-2 size-3.5 text-muted-foreground" />
            <input
              aria-label="Search files"
              className="h-7 w-40 rounded-md border bg-background pr-2 pl-7 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
              placeholder="Search…"
            />
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Select defaultValue="name-asc" items={sortOptions}>
            <ToolbarButton
              render={
                <SelectTrigger className="h-7 w-32 gap-1 text-xs">
                  <SortAscIcon className="size-3 shrink-0" />
                  <SelectValue />
                </SelectTrigger>
              }
            />
            <SelectPopup>
              {sortOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Filter"
                  render={<Button size="icon" variant="ghost" />}
                >
                  <SlidersHorizontalIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Filter</TooltipContent>
          </Tooltip>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToggleGroup
          className="border-none p-0"
          onValueChange={([v]) => v && setView(v)}
          value={[view]}
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Grid view"
                  render={<ToggleGroupItem value="grid" />}
                >
                  <LayoutGridIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="List view"
                  render={<ToggleGroupItem value="list" />}
                >
                  <LayoutListIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>List view</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
