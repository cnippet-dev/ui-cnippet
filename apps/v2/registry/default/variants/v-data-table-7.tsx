"use client";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { CopyIcon, EllipsisIcon, RefreshCwIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { DataTable } from "@/registry/default/ui/data-table";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

type ApiKey = {
  created: string;
  id: string;
  lastUsed: string;
  name: string;
  prefix: string;
  status: "active" | "revoked";
};

const KEYS: ApiKey[] = [
  {
    created: "Aug 4, 2026",
    id: "k1",
    lastUsed: "2 min ago",
    name: "Production",
    prefix: "sk_live_4f2a",
    status: "active",
  },
  {
    created: "Sep 12, 2026",
    id: "k2",
    lastUsed: "1 hr ago",
    name: "Staging",
    prefix: "sk_test_9c1d",
    status: "active",
  },
  {
    created: "Oct 1, 2026",
    id: "k3",
    lastUsed: "Never",
    name: "CI pipeline",
    prefix: "sk_test_77be",
    status: "active",
  },
  {
    created: "Mar 18, 2026",
    id: "k4",
    lastUsed: "Jun 2, 2026",
    name: "Old mobile app",
    prefix: "sk_live_0a93",
    status: "revoked",
  },
];

// Row actions need to update data owned by the component, so they're passed
// to the table through `meta` rather than captured by module-level columns.
type Actions = { revoke: (id: string) => void };

const features = tableFeatures({});
const column = createColumnHelper<typeof features, ApiKey>();

const columns = column.columns([
  column.accessor("name", {
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">{row.original.name}</span>
        <span className="font-mono text-muted-foreground text-xs">
          {row.original.prefix}••••••••
        </span>
      </div>
    ),
    header: "Key",
  }),
  column.accessor("status", {
    cell: (info) =>
      info.getValue() === "active" ? (
        <Badge variant="success">Active</Badge>
      ) : (
        <Badge variant="outline">Revoked</Badge>
      ),
    header: "Status",
  }),
  column.accessor("created", { header: "Created" }),
  column.accessor("lastUsed", {
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
    header: "Last used",
  }),
  column.display({
    cell: ({ row, table }) => {
      const actions = table.options.meta as Actions | undefined;
      const revoked = row.original.status === "revoked";
      return (
        <div className="flex justify-end">
          <Menu>
            <MenuTrigger
              render={
                <Button
                  aria-label={`Actions for ${row.original.name}`}
                  size="icon-sm"
                  variant="ghost"
                />
              }
            >
              <EllipsisIcon aria-hidden="true" />
            </MenuTrigger>
            <MenuPopup align="end" className="min-w-40">
              <MenuGroup>
                <MenuItem>
                  <CopyIcon aria-hidden="true" />
                  Copy prefix
                </MenuItem>
                <MenuItem disabled={revoked}>
                  <RefreshCwIcon aria-hidden="true" />
                  Rotate key
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem
                disabled={revoked}
                onClick={() => actions?.revoke(row.original.id)}
                variant="destructive"
              >
                <TrashIcon aria-hidden="true" />
                Revoke
              </MenuItem>
            </MenuPopup>
          </Menu>
        </div>
      );
    },
    header: () => <span className="sr-only">Actions</span>,
    id: "actions",
  }),
]);

export default function Particle() {
  const [keys, setKeys] = useState(KEYS);
  const actions: Actions = {
    revoke: (id) =>
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)),
      ),
  };

  const table = useTable({
    columns,
    data: keys,
    features,
    getRowId: (row) => row.id,
    meta: actions,
  });

  return (
    <div className="w-full max-w-2xl">
      <DataTable table={table} variant="card" />
    </div>
  );
}
