"use client";

import {
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Badge } from "@/registry/default/ui/badge";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableViewOptions,
} from "@/registry/default/ui/data-table";

type Order = {
  channel: "Web" | "Mobile" | "Retail";
  customer: string;
  id: string;
  items: number;
  region: string;
  status: "Fulfilled" | "Processing" | "Refunded";
  total: number;
};

const ORDERS: Order[] = [
  {
    channel: "Web",
    customer: "Alice Park",
    id: "#3210",
    items: 3,
    region: "US East",
    status: "Fulfilled",
    total: 182,
  },
  {
    channel: "Mobile",
    customer: "Ben Torres",
    id: "#3211",
    items: 1,
    region: "EU West",
    status: "Processing",
    total: 49,
  },
  {
    channel: "Retail",
    customer: "Celia Kim",
    id: "#3212",
    items: 5,
    region: "APAC",
    status: "Fulfilled",
    total: 410,
  },
  {
    channel: "Web",
    customer: "Dan Moss",
    id: "#3213",
    items: 2,
    region: "US West",
    status: "Refunded",
    total: 96,
  },
  {
    channel: "Mobile",
    customer: "Sofia Reyes",
    id: "#3214",
    items: 4,
    region: "EU West",
    status: "Processing",
    total: 238,
  },
];

const STATUS_VARIANT = {
  Fulfilled: "success",
  Processing: "warning",
  Refunded: "outline",
} as const;

const features = tableFeatures({
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const column = createColumnHelper<typeof features, Order>();

const columns = column.columns([
  column.accessor("id", {
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    enableHiding: false,
    header: "Order",
  }),
  column.accessor("customer", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  }),
  column.accessor("channel", { header: "Channel" }),
  column.accessor("region", { header: "Region" }),
  column.accessor("items", {
    cell: (info) => (
      <div className="text-end tabular-nums">{info.getValue()}</div>
    ),
    header: () => <div className="text-end">Items</div>,
  }),
  column.accessor("status", {
    cell: (info) => (
      <Badge variant={STATUS_VARIANT[info.getValue()]}>{info.getValue()}</Badge>
    ),
    header: "Status",
  }),
  column.accessor("total", {
    cell: (info) => (
      <div className="text-end tabular-nums">${info.getValue()}</div>
    ),
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Total" />
      </div>
    ),
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: ORDERS,
    features,
    // Secondary columns start hidden; the View menu brings them back.
    initialState: { columnVisibility: { channel: false, region: false } },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-sm">Recent orders</p>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-xl border bg-background">
        <DataTable table={table} />
      </div>
    </div>
  );
}
