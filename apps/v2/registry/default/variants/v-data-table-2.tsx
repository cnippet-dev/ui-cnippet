"use client";

import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Badge } from "@/registry/default/ui/badge";
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableSearch,
} from "@/registry/default/ui/data-table";

type Customer = {
  company: string;
  email: string;
  id: string;
  mrr: number;
  name: string;
  plan: "Free" | "Pro" | "Team";
};

const FIRST = [
  "Alice",
  "Ben",
  "Celia",
  "Dan",
  "Sofia",
  "Margaret",
  "Priya",
  "Liam",
];
const LAST = [
  "Park",
  "Torres",
  "Kim",
  "Moss",
  "Reyes",
  "Welsh",
  "Shah",
  "Rivera",
];
const COMPANIES = [
  "Northwind",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark",
];
const PLANS: Customer["plan"][] = ["Free", "Pro", "Team"];

// A deterministic directory so server and client render the same rows.
const CUSTOMERS: Customer[] = Array.from({ length: 24 }, (_, i) => {
  const first = FIRST[i % FIRST.length] ?? "Alex";
  const last = LAST[(i + Math.floor(i / 8)) % LAST.length] ?? "Lee";
  const plan = PLANS[(i * 7) % PLANS.length] ?? "Free";
  return {
    company: COMPANIES[(i * 5) % COMPANIES.length] ?? "Acme",
    email: `${first.toLowerCase()}.${last.toLowerCase()}@acme.dev`,
    id: `cus_${String(i + 1).padStart(3, "0")}`,
    mrr: plan === "Free" ? 0 : plan === "Pro" ? 29 + i : 99 + i * 4,
    name: `${first} ${last}`,
    plan,
  };
});

const PLAN_VARIANT = {
  Free: "outline",
  Pro: "secondary",
  Team: "info",
} as const;

const currency = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const column = createColumnHelper<typeof features, Customer>();

const columns = column.columns([
  // One accessor for name + email, so search matches either; it still sorts
  // by name first.
  column.accessor((row) => `${row.name} ${row.email}`, {
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-muted-foreground text-xs">
          {row.original.email}
        </span>
      </div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    id: "customer",
  }),
  column.accessor("company", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  }),
  column.accessor("plan", {
    cell: (info) => (
      <Badge variant={PLAN_VARIANT[info.getValue()]}>{info.getValue()}</Badge>
    ),
    header: "Plan",
  }),
  column.accessor("mrr", {
    cell: (info) => (
      <div className="text-end tabular-nums">
        {currency.format(info.getValue())}
      </div>
    ),
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="MRR" />
      </div>
    ),
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: CUSTOMERS,
    features,
    getRowId: (row) => row.id,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <DataTableSearch placeholder="Search customers…" table={table} />
      <div className="rounded-xl border bg-background">
        <DataTable
          emptyMessage="No customers match your search."
          table={table}
        />
      </div>
      <DataTablePagination pageSizeOptions={[5, 10, 20]} table={table} />
    </div>
  );
}
