"use client";

import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrHas,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
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
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  type DataTableFilterOption,
  DataTablePagination,
  DataTableRowCheckbox,
  DataTableSearch,
  DataTableSelectAll,
  DataTableViewOptions,
} from "@/registry/default/ui/data-table";

type Task = {
  assignee: string;
  id: string;
  label: "Bug" | "Feature" | "Docs";
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "done" | "canceled";
  title: string;
};

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

const TITLES = [
  "Checkout fails for saved cards",
  "Add CSV export to reports",
  "Dashboard charts load slowly",
  "Document the webhooks API",
  "Rate limit webhook retries",
  "Dark mode for email templates",
  "Fix focus ring on dialogs",
  "Bulk invite from a CSV file",
  "Typo in onboarding email",
  "Audit log filters by actor",
  "Retry failed payouts",
  "Write the migration guide",
];
const LABELS: Task["label"][] = ["Bug", "Feature", "Docs"];
const ASSIGNEES = ["Alice Park", "Ben Torres", "Celia Kim", "Dan Moss"];

// A deterministic backlog so server and client render the same rows.
const TASKS: Task[] = Array.from({ length: 36 }, (_, i) => ({
  assignee: ASSIGNEES[(i * 3) % ASSIGNEES.length] ?? "Unassigned",
  id: `ACM-${400 + i}`,
  label: LABELS[i % LABELS.length] ?? "Bug",
  priority: (PRIORITIES[(i + Math.floor(i / 4)) % PRIORITIES.length]?.value ??
    "low") as Task["priority"],
  status: (STATUSES[(i * 3 + Math.floor(i / 5)) % STATUSES.length]?.value ??
    "todo") as Task["status"],
  title: TITLES[(i * 5) % TITLES.length] ?? "Untitled",
}));

const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    arrHas: filterFn_arrHas,
    includesString: filterFn_includesString,
  },
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const column = createColumnHelper<typeof features, Task>();

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
  column.display({
    cell: ({ row }) => (
      <DataTableRowCheckbox label={`Select ${row.original.id}`} row={row} />
    ),
    enableHiding: false,
    header: ({ table }) => <DataTableSelectAll table={table} />,
    id: "select",
  }),
  column.accessor("id", {
    cell: (info) => (
      <span className="font-mono text-muted-foreground text-xs">
        {info.getValue()}
      </span>
    ),
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
  }),
  column.accessor("title", {
    cell: ({ row }) => (
      <div className="flex max-w-80 items-center gap-2">
        <Badge size="sm" variant="outline">
          {row.original.label}
        </Badge>
        <span className="truncate font-medium">{row.original.title}</span>
      </div>
    ),
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  }),
  column.accessor("status", {
    cell: (info) => <OptionCell options={STATUSES} value={info.getValue()} />,
    enableGlobalFilter: false,
    filterFn: "arrHas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  }),
  column.accessor("priority", {
    cell: (info) => <OptionCell options={PRIORITIES} value={info.getValue()} />,
    enableGlobalFilter: false,
    filterFn: "arrHas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
  }),
  column.accessor("assignee", {
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
    header: "Assignee",
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: TASKS,
    features,
    getRowId: (row) => row.id,
    globalFilterFn: "includesString",
    initialState: {
      columnVisibility: { assignee: false },
      pagination: { pageIndex: 0, pageSize: 8 },
    },
  });

  const statusColumn = table.getColumn("status");
  const priorityColumn = table.getColumn("priority");
  const isFiltered =
    table.state.columnFilters.length > 0 || Boolean(table.state.globalFilter);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch placeholder="Filter tasks…" table={table} />
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
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-xl border bg-background">
        <DataTable emptyMessage="No tasks match these filters." table={table} />
      </div>
      <DataTablePagination pageSizeOptions={[8, 16, 36]} table={table} />
    </div>
  );
}
