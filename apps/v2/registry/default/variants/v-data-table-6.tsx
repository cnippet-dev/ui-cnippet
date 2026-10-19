// title: Department budgets with expandable sub-rows
"use client";

import {
  createColumnHelper,
  createExpandedRowModel,
  rowExpandingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { DataTable } from "@/registry/default/ui/data-table";
import { Progress } from "@/registry/default/ui/progress";

type Budget = {
  budget: number;
  name: string;
  spent: number;
  subRows?: Budget[];
};

const BUDGETS: Budget[] = [
  {
    budget: 420_000,
    name: "Engineering",
    spent: 318_000,
    subRows: [
      { budget: 180_000, name: "Platform", spent: 152_000 },
      { budget: 140_000, name: "Web", spent: 96_000 },
      { budget: 100_000, name: "Mobile", spent: 70_000 },
    ],
  },
  {
    budget: 160_000,
    name: "Marketing",
    spent: 141_000,
    subRows: [
      { budget: 90_000, name: "Campaigns", spent: 88_500 },
      { budget: 70_000, name: "Events", spent: 52_500 },
    ],
  },
  {
    budget: 95_000,
    name: "Design",
    spent: 61_000,
    subRows: [
      { budget: 55_000, name: "Product design", spent: 38_000 },
      { budget: 40_000, name: "Brand", spent: 23_000 },
    ],
  },
];

const currency = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
  style: "currency",
});

const features = tableFeatures({
  expandedRowModel: createExpandedRowModel(),
  rowExpandingFeature,
});

const column = createColumnHelper<typeof features, Budget>();

const columns = column.columns([
  column.accessor("name", {
    cell: ({ row, getValue }) => (
      <div
        className="flex items-center gap-1.5"
        // Indent sub-rows under their parent team.
        style={{ paddingInlineStart: `${row.depth * 1.75}rem` }}
      >
        {row.getCanExpand() ? (
          <Button
            aria-expanded={row.getIsExpanded()}
            aria-label={`${row.getIsExpanded() ? "Collapse" : "Expand"} ${getValue()}`}
            className="-ms-1.5"
            onClick={row.getToggleExpandedHandler()}
            size="icon-xs"
            variant="ghost"
          >
            <ChevronRightIcon
              aria-hidden="true"
              className={cn(
                "transition-transform",
                row.getIsExpanded() && "rotate-90",
              )}
            />
          </Button>
        ) : null}
        <span className={cn(row.depth === 0 && "font-medium")}>
          {getValue()}
        </span>
      </div>
    ),
    header: "Department",
  }),
  column.accessor("spent", {
    cell: ({ row }) => {
      const used = Math.round((row.original.spent / row.original.budget) * 100);
      return (
        <div className="flex min-w-36 items-center gap-3">
          <Progress aria-label="Budget used" className="w-24" value={used} />
          <span className="text-muted-foreground text-xs tabular-nums">
            {used}%
          </span>
        </div>
      );
    },
    header: "Used",
  }),
  column.accessor("budget", {
    cell: ({ row }) => (
      <div className="text-end tabular-nums">
        {currency.format(row.original.spent)}
        <span className="text-muted-foreground">
          {" "}
          / {currency.format(row.original.budget)}
        </span>
      </div>
    ),
    header: () => <div className="text-end">Spent</div>,
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: BUDGETS,
    features,
    getSubRows: (row) => row.subRows,
    initialState: { expanded: { "0": true } },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-sm">FY26 budget</p>
        <div className="flex gap-1">
          <Button
            onClick={() => table.toggleAllRowsExpanded(true)}
            size="xs"
            variant="ghost"
          >
            Expand all
          </Button>
          <Button
            onClick={() => table.toggleAllRowsExpanded(false)}
            size="xs"
            variant="ghost"
          >
            Collapse all
          </Button>
        </div>
      </div>
      <div className="rounded-xl border bg-background">
        <DataTable table={table} />
      </div>
    </div>
  );
}
