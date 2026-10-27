"use client";

import type * as React from "react";
import { Heatmap } from "@/registry/default/charts/heatmap";
import { formatCompact, formatDate } from "@/registry/default/lib/chart-utils";

export type CalendarHeatmapDay = {
  /** "YYYY-MM-DD" */
  date: string;
  value: number;
};

export type CalendarHeatmapProps = {
  /** One entry per day with a value; days without one count as 0. */
  data: CalendarHeatmapDay[];
  /** First day shown, "YYYY-MM-DD". Default: earliest date in `data`. */
  startDate?: string;
  /** Last day shown, "YYYY-MM-DD". Default: latest date in `data`. */
  endDate?: string;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
  valueFormatter?: (value: number) => string;
  /** Tooltip per day. Default: "Mar 14, 2026: 4". */
  cellLabel?: (day: CalendarHeatmapDay) => string;
  /** CSS colour of the busiest day. */
  color?: string;
  showLegend?: boolean;
  /** Smallest day size in px; the calendar scrolls sideways below it. */
  minCellSize?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

const DAY_MS = 86_400_000;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-03-14" → UTC midnight in ms, so day maths never crosses a DST change. */
const parse = (date: string) => {
  const [year = 0, month = 1, day = 1] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
};
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

type Cell = CalendarHeatmapDay & { week: string; weekday: string };

export function CalendarHeatmap({
  data,
  startDate,
  endDate,
  weekStart = 0,
  valueFormatter = formatCompact,
  cellLabel,
  color,
  showLegend,
  minCellSize = 10,
  loading,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: CalendarHeatmapProps) {
  const sorted = data.map((d) => d.date).sort();
  const start = startDate ?? sorted[0];
  const end = endDate ?? sorted.at(-1);
  const values = new Map(data.map((d) => [d.date, d.value]));
  const weekdays = [
    ...WEEKDAYS.slice(weekStart),
    ...WEEKDAYS.slice(0, weekStart),
  ];

  const cells: Cell[] = [];
  const monthOfWeek: string[] = [];
  if (start && end) {
    const first = parse(start);
    // Back up to the first day of that week so columns line up.
    const offset = (new Date(first).getUTCDay() - weekStart + 7) % 7;
    const gridStart = first - offset * DAY_MS;
    for (let ms = first; ms <= parse(end); ms += DAY_MS) {
      const index = Math.round((ms - gridStart) / DAY_MS);
      const week = String(Math.floor(index / 7));
      const date = iso(ms);
      // Label a column with the month that starts in it (or the first column),
      // unless the previous label is too close to fit.
      const w = Number(week);
      if (
        (date.endsWith("-01") || ms === first) &&
        !monthOfWeek.slice(Math.max(0, w - 2), w + 1).some(Boolean)
      ) {
        monthOfWeek[w] = formatDate(date, { month: "short" });
      }
      cells.push({
        date,
        value: values.get(date) ?? 0,
        week,
        weekday: weekdays[index % 7] ?? "",
      });
    }
  }
  const weeks = Array.from(
    { length: Number(cells.at(-1)?.week ?? -1) + 1 },
    (_, i) => String(i),
  );

  return (
    <Heatmap
      aria-label={ariaLabel ?? "Calendar heatmap"}
      cellLabel={
        cellLabel ??
        ((day) =>
          `${formatDate(day.date, { day: "numeric", month: "short", year: "numeric" })}: ${valueFormatter(day.value)}`)
      }
      className={className}
      color={color}
      data={cells}
      emptyState={emptyState}
      loading={loading}
      min={0}
      minCellSize={minCellSize}
      showLegend={showLegend}
      value="value"
      valueFormatter={valueFormatter}
      x="week"
      xFormatter={(week) => monthOfWeek[Number(week)] ?? ""}
      xLabels={weeks}
      y="weekday"
      // Label Mon, Wed and Fri, like most contribution graphs.
      yFormatter={(day) => (["Mon", "Wed", "Fri"].includes(day) ? day : "")}
      yLabels={weekdays}
    />
  );
}
