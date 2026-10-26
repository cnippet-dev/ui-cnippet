"use client";

import { ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { useActiveTooltipLabel } from "recharts";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type DrilldownNode = {
  name: string;
  value: number;
  children?: DrilldownNode[];
};

export type DrilldownChartProps = {
  data: DrilldownNode[];
  /** First breadcrumb, e.g. "All regions". */
  rootLabel?: string;
  /** Name of the measure, used in the tooltip, e.g. "Revenue". */
  valueLabel?: string;
  valueFormatter?: (value: number) => string;
  /** CSS colour of the bars. */
  color?: string;
  /** Called with the path of names after each drill or step back. */
  onPathChange?: (path: string[]) => void;
  layout?: "horizontal" | "vertical";
  yAxisWidth?: number;
  className?: string;
  "aria-label"?: string;
};

// Reports the bar under the mouse or keyboard focus, so Enter can drill into it.
function ActiveLabel({ onChange }: { onChange: (label?: string) => void }) {
  const label = useActiveTooltipLabel();
  React.useEffect(() => {
    onChange(label === undefined ? undefined : String(label));
  }, [label, onChange]);
  return null;
}

export function DrilldownChart({
  data,
  rootLabel = "All",
  valueLabel = "Value",
  valueFormatter = formatCompact,
  color = "var(--chart-1)",
  onPathChange,
  layout = "horizontal",
  yAxisWidth,
  className,
  "aria-label": ariaLabel,
}: DrilldownChartProps) {
  const [path, setPath] = React.useState<string[]>([]);
  const active = React.useRef<string | undefined>(undefined);
  const setActive = React.useCallback((label?: string) => {
    active.current = label;
  }, []);

  // Walk the path; stop early if the data changed under it.
  let level = data;
  for (const name of path) {
    const next = level.find((n) => n.name === name)?.children;
    if (!next) break;
    level = next;
  }

  const go = (next: string[]) => {
    setPath(next);
    onPathChange?.(next);
  };
  const drill = (name?: string) => {
    if (name && level.find((n) => n.name === name)?.children?.length) {
      go([...path, name]);
    }
  };
  const crumbs = [rootLabel, ...path];

  return (
    <div className="grid w-full gap-3" data-slot="drilldown-chart">
      <nav aria-label="Drill-down level">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {crumbs.map((crumb, i) => (
            <li className="flex items-center gap-1" key={`${i}-${crumb}`}>
              {i > 0 ? (
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground"
                />
              ) : null}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="font-medium">
                  {crumb}
                </span>
              ) : (
                <button
                  className="rounded-sm text-muted-foreground outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => go(path.slice(0, i))}
                  type="button"
                >
                  {crumb}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div
        onKeyDown={(event) => {
          if (event.key === "Enter") drill(active.current);
        }}
      >
        <BarChart
          aria-label={
            ariaLabel ??
            `${valueLabel} by ${crumbs.at(-1)}. Click a bar, or focus the chart, use the arrow keys and press Enter, to drill down.`
          }
          categories={["value"]}
          className={cn(className)}
          config={{ value: { color, label: valueLabel } }}
          data={level.map(({ name, value }) => ({ name, value }))}
          index="name"
          layout={layout}
          onValueClick={({ index }) => drill(index)}
          valueFormatter={valueFormatter}
          yAxisWidth={yAxisWidth}
        >
          <ActiveLabel onChange={setActive} />
        </BarChart>
      </div>
    </div>
  );
}
