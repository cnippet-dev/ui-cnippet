"use client";

import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Badge } from "@/registry/default/ui/badge";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/registry/default/ui/data-table";

type Invoice = {
  amount: number;
  customer: string;
  id: string;
  issued: Date;
  status: "paid" | "pending" | "overdue";
};

const INVOICES: Invoice[] = [
  {
    amount: 1250,
    customer: "Northwind",
    id: "INV-1042",
    issued: new Date(2026, 9, 2),
    status: "paid",
  },
  {
    amount: 480,
    customer: "Globex",
    id: "INV-1043",
    issued: new Date(2026, 9, 5),
    status: "pending",
  },
  {
    amount: 3200,
    customer: "Initech",
    id: "INV-1044",
    issued: new Date(2026, 8, 21),
    status: "overdue",
  },
  {
    amount: 760,
    customer: "Umbrella",
    id: "INV-1045",
    issued: new Date(2026, 9, 9),
    status: "paid",
  },
  {
    amount: 1980,
    customer: "Hooli",
    id: "INV-1046",
    issued: new Date(2026, 9, 11),
    status: "pending",
  },
];

const STATUS = {
  overdue: { label: "Overdue", variant: "destructive" },
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
} as const;

const currency = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

// Features, columns and data live at module scope so the table's models
// aren't rebuilt on every render.
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, datetime: sortFn_datetime },
});

const column = createColumnHelper<typeof features, Invoice>();

const columns = column.columns([
  column.accessor("id", {
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
  }),
  column.accessor("customer", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  }),
  column.accessor("issued", {
    cell: (info) => dateFormat.format(info.getValue()),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issued" />
    ),
    sortFn: "datetime",
  }),
  column.accessor("status", {
    cell: (info) => {
      const status = STATUS[info.getValue()];
      return <Badge variant={status.variant}>{status.label}</Badge>;
    },
    enableSorting: false,
    header: "Status",
  }),
  column.accessor("amount", {
    cell: (info) => (
      <div className="text-end tabular-nums">
        {currency.format(info.getValue())}
      </div>
    ),
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Amount" />
      </div>
    ),
  }),
]);

export default function Particle() {
  const table = useTable({
    columns,
    data: INVOICES,
    features,
    initialState: { sorting: [{ desc: true, id: "issued" }] },
  });

  return (
    <div className="w-full max-w-2xl rounded-xl border bg-background">
      <DataTable table={table} />
    </div>
  );
}
