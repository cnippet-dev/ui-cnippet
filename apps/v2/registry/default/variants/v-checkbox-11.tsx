"use client";

import { useId, useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";

const COLUMNS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ROWS = ["Morning", "Afternoon", "Evening"];

type Grid = Record<string, boolean>;

function key(row: string, col: string) {
  return `${row}-${col}`;
}

export function Pattern() {
  const id = useId();
  const [grid, setGrid] = useState<Grid>(() =>
    Object.fromEntries(
      ROWS.flatMap((r) => COLUMNS.map((c) => [key(r, c), false])),
    ),
  );

  const toggle = (k: string) => setGrid((prev) => ({ ...prev, [k]: !prev[k] }));

  const count = Object.values(grid).filter(Boolean).length;

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Weekly Availability</p>
        <span className="text-muted-foreground text-xs">
          {count} slots selected
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="w-24 pb-2 text-left font-medium text-muted-foreground" />
              {COLUMNS.map((col) => (
                <th
                  className="pb-2 text-center font-medium text-muted-foreground"
                  key={col}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row}>
                <td className="py-2 pr-3 text-muted-foreground">{row}</td>
                {COLUMNS.map((col) => {
                  const k = key(row, col);
                  return (
                    <td className="py-2 text-center" key={col}>
                      <Checkbox
                        checked={grid[k]}
                        id={`${id}-${k}`}
                        onCheckedChange={() => toggle(k)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
