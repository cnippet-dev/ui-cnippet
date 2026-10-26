"use client";

import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export type TrackerBlock = {
  /** CSS colour, e.g. "var(--success)". Default: var(--muted). */
  color?: string;
  /** Shown on hover/focus and read by screen readers, e.g. "Oct 12 — Operational". */
  tooltip: string;
  key?: string;
};

export type TrackerProps = {
  data: TrackerBlock[];
  /** Describes the whole row, e.g. "API uptime, last 90 days". */
  "aria-label": string;
  className?: string;
};

export function Tracker({
  data,
  "aria-label": ariaLabel,
  className,
}: TrackerProps) {
  // Roving focus: the row is one tab stop, arrow keys move between blocks.
  const [activeIndex, setActive] = React.useState(Math.max(data.length - 1, 0));
  const active = Math.min(activeIndex, data.length - 1);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (event: React.KeyboardEvent, i: number) => {
    const next =
      event.key === "ArrowRight"
        ? i + 1
        : event.key === "ArrowLeft"
          ? i - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? data.length - 1
              : undefined;
    if (next === undefined || next < 0 || next >= data.length) return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <TooltipProvider delay={0}>
      <div
        aria-label={ariaLabel}
        className={cn("flex h-8 w-full gap-px sm:gap-0.5", className)}
        data-slot="tracker"
        role="group"
      >
        {data.map((block, i) => (
          <Tooltip key={block.key ?? i}>
            <TooltipTrigger
              render={
                <button
                  aria-label={block.tooltip}
                  className="h-full min-w-0 flex-1 rounded-[1px] outline-none first:rounded-s-sm last:rounded-e-sm hover:opacity-72 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                  onFocus={() => setActive(i)}
                  onKeyDown={(event) => move(event, i)}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  style={{ backgroundColor: block.color ?? "var(--muted)" }}
                  tabIndex={i === active ? 0 : -1}
                  type="button"
                />
              }
            />
            <TooltipPopup>{block.tooltip}</TooltipPopup>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
