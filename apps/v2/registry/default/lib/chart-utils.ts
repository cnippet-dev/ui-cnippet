import type { ChartConfig } from "@/registry/default/ui/chart";

const CHART_COLORS = 5;

/** 1234 → "1.2K", 1_250_000 → "1.3M" */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value);
}

/** 12400 → "$12.4K". Pass `compact: false` for "$12,400.00". */
export function formatCurrency(
  value: number,
  currency = "USD",
  { compact = true }: { compact?: boolean } = {},
): string {
  return new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: compact ? 1 : 2,
    notation: compact ? "compact" : "standard",
    style: "currency",
  }).format(value);
}

/** Takes a fraction: 0.384 → "38.4%". `signed` adds "+" to positive values. */
export function formatPercent(
  value: number,
  { digits = 1, signed = false }: { digits?: number; signed?: boolean } = {},
): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    signDisplay: signed ? "exceptZero" : "auto",
    style: "percent",
  }).format(value);
}

/** "2026-03-14" → "Mar 14". Pass Intl options for other shapes. */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" },
): string {
  // Date-only strings parse as UTC; format in UTC so "2026-03-14" never shows as Mar 13.
  const timeZone =
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? "UTC"
      : undefined;
  return new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(
    new Date(date),
  );
}

/**
 * Builds a ChartConfig from series keys, assigning `var(--chart-1…5)` in
 * order (cycling) and a title-cased label. `overrides` win per key.
 */
export function buildChartConfig(
  categories: string[],
  overrides: ChartConfig = {},
): ChartConfig {
  return Object.fromEntries(
    categories.map((key, i) => [
      key,
      {
        color: `var(--chart-${(i % CHART_COLORS) + 1})`,
        label: titleCase(key),
        ...overrides[key],
      },
    ]),
  ) as ChartConfig;
}

/** Sums `keys` across rows, skipping null and non-numeric values. */
export function sumBy<T extends Record<string, unknown>>(
  rows: T[],
  keys: (keyof T & string)[],
): number {
  let total = 0;
  for (const row of rows) {
    for (const key of keys) {
      const value = row[key];
      if (typeof value === "number" && Number.isFinite(value)) total += value;
    }
  }
  return total;
}

/** "desktop" → "Desktop", "newSignups" → "New Signups", "api_calls" → "Api Calls" */
function titleCase(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
