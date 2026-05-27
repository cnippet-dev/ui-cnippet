"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/registry/default/ui/badge";
import { Toggle } from "@/registry/default/ui/toggle";

const filters = [
  { id: "design", label: "Design", count: 24 },
  { id: "engineering", label: "Engineering", count: 41 },
  { id: "product", label: "Product", count: 18 },
  { id: "marketing", label: "Marketing", count: 12 },
  { id: "leadership", label: "Leadership", count: 7 },
  { id: "research", label: "Research", count: 9 },
];

export function Pattern() {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const totalResults =
    active.size === 0
      ? filters.reduce((sum, f) => sum + f.count, 0)
      : filters
          .filter((f) => active.has(f.id))
          .reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <SlidersHorizontalIcon className="size-3.5" />
          <span>Filter by role</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">{totalResults} results</span>
          {active.size > 0 && (
            <button
              className="text-muted-foreground text-xs underline-offset-2 hover:text-foreground hover:underline"
              onClick={() => setActive(new Set())}
              type="button"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = active.has(filter.id);
          return (
            <Toggle
              aria-label={`Filter by ${filter.label}`}
              className="gap-1.5 rounded-full"
              key={filter.id}
              onPressedChange={() => toggle(filter.id)}
              pressed={isActive}
              size="sm"
              variant="outline"
            >
              {filter.label}
              <Badge
                className={`transition-colors ${isActive ? "bg-primary-foreground/20 text-current" : ""}`}
                size="sm"
                variant={isActive ? "default" : "outline"}
              >
                {filter.count}
              </Badge>
            </Toggle>
          );
        })}
      </div>
    </div>
  );
}
