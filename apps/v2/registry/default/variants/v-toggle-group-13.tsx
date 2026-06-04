"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

type Range = "today" | "week" | "month" | "quarter" | "year";

const ranges: { id: Range; label: string; sublabel: string }[] = [
  { id: "today", label: "Today", sublabel: "Jun 3" },
  { id: "week", label: "Week", sublabel: "Jun 1–7" },
  { id: "month", label: "Month", sublabel: "June" },
  { id: "quarter", label: "Quarter", sublabel: "Q2" },
  { id: "year", label: "Year", sublabel: "2025" },
];

const stats: Record<Range, { label: string; value: string }[]> = {
  month: [
    { label: "Revenue", value: "$34,892" },
    { label: "Sessions", value: "128,430" },
    { label: "Conversions", value: "3.4%" },
  ],
  quarter: [
    { label: "Revenue", value: "$98,241" },
    { label: "Sessions", value: "385,291" },
    { label: "Conversions", value: "3.1%" },
  ],
  today: [
    { label: "Revenue", value: "$1,284" },
    { label: "Sessions", value: "4,231" },
    { label: "Conversions", value: "2.8%" },
  ],
  week: [
    { label: "Revenue", value: "$8,942" },
    { label: "Sessions", value: "29,840" },
    { label: "Conversions", value: "3.2%" },
  ],
  year: [
    { label: "Revenue", value: "$412,840" },
    { label: "Sessions", value: "1.54M" },
    { label: "Conversions", value: "3.3%" },
  ],
};

export function Pattern() {
  const [range, setRange] = useState<Range>("month");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ToggleGroup
        className="w-full"
        onValueChange={(v) => v[0] && setRange(v[0] as Range)}
        value={[range]}
        variant="outline"
      >
        {ranges.map((r) => (
          <ToggleGroupItem
            aria-label={`View ${r.label} stats`}
            className="flex-1 flex-col gap-0 py-2 text-xs leading-none"
            key={r.id}
            value={r.id}
          >
            <span className="font-medium">{r.label}</span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">
              {r.sublabel}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="grid grid-cols-3 gap-2">
        {stats[range].map((s) => (
          <div
            className="flex flex-col gap-0.5 rounded-lg border border-border p-3 text-center"
            key={s.label}
          >
            <span className="font-bold text-lg">{s.value}</span>
            <span className="text-muted-foreground text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
