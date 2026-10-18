"use client";

import {
  columnFacetingFeature,
  columnFilteringFeature,
  createColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  filterFn_arrHas,
  filterFn_includesString,
  globalFilteringFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  TimerIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  DataTable,
  DataTableFacetedFilter,
  type DataTableFilterOption,
  DataTableSearch,
} from "@/registry/default/ui/data-table";

type Issue = {
  id: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "done" | "canceled";
  title: string;
};

const ISSUES: Issue[] = [
  {
    id: "ACM-412",
    priority: "urgent",
    status: "in-progress",
    title: "Checkout fails for saved cards",
  },
  {
    id: "ACM-415",
    priority: "high",
    status: "todo",
    title: "Dashboard charts load slowly",
  },
  {
    id: "ACM-418",
    priority: "medium",
    status: "done",
    title: "Add CSV export to reports",
  },
  {
    id: "ACM-420",
    priority: "low",
    status: "todo",
    title: "Typo in onboarding email",
  },
  {
    id: "ACM-423",
    priority: "high",
    status: "in-progress",
    title: "Rate limit webhook retries",
  },
  {
    id: "ACM-427",
    priority: "medium",
    status: "canceled",
    title: "Legacy theme migration",
  },
  {
    id: "ACM-431",
    priority: "low",
    status: "done",
    title: "Update footer links",
  },
];

const STATUSES: DataTableFilterOption[] = [
  { icon: CircleDashedIcon, label: "Todo", value: "todo" },
  { icon: TimerIcon, label: "In progress", value: "in-progress" },
  { icon: CircleCheckIcon, label: "Done", value: "done" },
  { icon: CircleXIcon, label: "Canceled", value: "canceled" },
];

const PRIORITIES: DataTableFilterOption[] = [
  { icon: ArrowDownIcon, label: "Low", value: "low" },
  { icon: ArrowRightIcon, label: "Medium", value: "medium" },
  { icon: ArrowUpIcon, label: "High", value: "high" },
  { icon: TriangleAlertIcon, label: "Urgent", value: "urgent" },
];

const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    arrHas: filterFn_arrHas,
    includesString: filterFn_includesString,
  },
  globalFilteringFeature,
});

const column = createColumnHelper<typeof features, Issue>();

function OptionCell({
  options,
  value,
}: {
  options: DataTableFilterOption[];
  value: string;
}) {
  const option = options.find((o) => o.value === value);
  if (!option) return null;
  return (
    <span className="flex items-center gap-2">
      {option.icon && <option.icon className="size-4 text-muted-foreground" />}
      {option.label}
    </span>
  );
}

const columns = column.columns([
  column.accessor("id", {
    cell: (info) => (
      <span className="font-mono text-muted-foreground text-xs">
        {info.getValue()}
      </span>
    ),
    enableGlobalFilter: false,
    header: "Issue",
  }),
  column.accessor("title", {
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    header: "Title",
  }),
  column.accessor("status", {
    cell: (info) => <OptionCell options={STATUSES} value={info.getValue()} />,
    enableGlobalFilter: false,
    filterFn: "arrHas",
    header: "Status",
  }),
  column.accessor("priority", {
    cell: (info) => <OptionCell options={PRIORITIES} value={info.getValue()} />,
    enableGlobalFilter: false,
    filterFn: "arrHas",
    header: "Priority",
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: ISSUES,
    features,
    getRowId: (row) => row.id,
    globalFilterFn: "includesString",
  });

  const statusColumn = table.getColumn("status");
  const priorityColumn = table.getColumn("priority");
  const isFiltered =
    table.state.columnFilters.length > 0 || Boolean(table.state.globalFilter);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch placeholder="Filter issues…" table={table} />
        {statusColumn && (
          <DataTableFacetedFilter
            column={statusColumn}
            options={STATUSES}
            title="Status"
          />
        )}
        {priorityColumn && (
          <DataTableFacetedFilter
            column={priorityColumn}
            options={PRIORITIES}
            title="Priority"
          />
        )}
        {isFiltered && (
          <Button
            onClick={() => {
              table.resetColumnFilters();
              table.resetGlobalFilter();
            }}
            size="sm"
            variant="ghost"
          >
            Reset
            <XIcon aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="rounded-xl border bg-background">
        <DataTable
          emptyMessage="No issues match these filters."
          table={table}
        />
      </div>
    </div>
  );
}
