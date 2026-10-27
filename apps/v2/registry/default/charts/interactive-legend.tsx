"use client";

import { cn } from "@/registry/default/lib/utils";
import type { ChartConfig } from "@/registry/default/ui/chart";

// The props Recharts injects into a `<ChartLegend content={…} />` element.
// Hidden series (`hide` on Area/Bar/Line) stay in the payload as `inactive`.
type LegendItem = {
  color?: string;
  dataKey?: unknown;
  inactive?: boolean;
  type?: string;
  value?: string;
};

export type InteractiveLegendProps = {
  payload?: LegendItem[];
  verticalAlign?: "top" | "middle" | "bottom";
  /** Same config as the chart's ChartContainer; used for labels and icons. */
  config?: ChartConfig;
  /** Called with the series key when an item is clicked. */
  onToggle?: (key: string) => void;
  /** Called with the hovered/focused series key, and `null` on leave. */
  onHighlight?: (key: string | null) => void;
  className?: string;
};

export function InteractiveLegend({
  payload,
  verticalAlign = "bottom",
  config = {},
  onToggle,
  onHighlight,
  className,
}: InteractiveLegendProps) {
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
      data-slot="interactive-legend"
      onMouseLeave={() => onHighlight?.(null)}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = String(item.dataKey ?? item.value ?? "");
          const itemConfig = config[key];
          const Icon = itemConfig?.icon;

          return (
            <button
              aria-pressed={!item.inactive}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs outline-none transition-[opacity,background-color] hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring aria-[pressed=false]:opacity-48 [&>svg]:size-3 [&>svg]:text-muted-foreground"
              key={key}
              onBlur={() => onHighlight?.(null)}
              onClick={() => onToggle?.(key)}
              onFocus={() => onHighlight?.(key)}
              onMouseEnter={() => onHighlight?.(key)}
              type="button"
            >
              {Icon ? (
                <Icon />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className={cn(item.inactive && "line-through")}>
                {itemConfig?.label ?? item.value ?? key}
              </span>
            </button>
          );
        })}
    </div>
  );
}
