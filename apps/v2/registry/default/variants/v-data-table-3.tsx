// title: Team members with row selection and bulk actions
"use client";

import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { MailIcon, UserMinusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  DataTable,
  DataTableRowCheckbox,
  DataTableSelectAll,
} from "@/registry/default/ui/data-table";

type Member = {
  email: string;
  id: string;
  initials: string;
  name: string;
  role: "Owner" | "Admin" | "Member";
};

const MEMBERS: Member[] = [
  {
    email: "alice@acme.dev",
    id: "u1",
    initials: "AP",
    name: "Alice Park",
    role: "Owner",
  },
  {
    email: "ben@acme.dev",
    id: "u2",
    initials: "BT",
    name: "Ben Torres",
    role: "Admin",
  },
  {
    email: "celia@acme.dev",
    id: "u3",
    initials: "CK",
    name: "Celia Kim",
    role: "Member",
  },
  {
    email: "dan@acme.dev",
    id: "u4",
    initials: "DM",
    name: "Dan Moss",
    role: "Member",
  },
  {
    email: "sofia@acme.dev",
    id: "u5",
    initials: "SR",
    name: "Sofia Reyes",
    role: "Member",
  },
  {
    email: "priya@acme.dev",
    id: "u6",
    initials: "PS",
    name: "Priya Shah",
    role: "Admin",
  },
];

const features = tableFeatures({ rowSelectionFeature });
const column = createColumnHelper<typeof features, Member>();

const columns = column.columns([
  column.display({
    cell: ({ row }) => (
      <DataTableRowCheckbox label={`Select ${row.original.name}`} row={row} />
    ),
    header: ({ table }) => <DataTableSelectAll table={table} />,
    id: "select",
  }),
  column.accessor("name", {
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs">
            {row.original.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-muted-foreground text-xs">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
    header: "Member",
  }),
  column.accessor("role", {
    cell: (info) => (
      <Badge variant={info.getValue() === "Member" ? "outline" : "secondary"}>
        {info.getValue()}
      </Badge>
    ),
    header: "Role",
  }),
]);

export default function Particle() {
  const [members, setMembers] = useState(MEMBERS);
  const table = useTable({
    columns,
    data: members,
    // The owner can't be removed, so their row isn't selectable.
    enableRowSelection: (row) => row.original.role !== "Owner",
    features,
    getRowId: (row) => row.id,
  });

  const selectedIds = Object.keys(table.state.rowSelection);

  const removeSelected = () => {
    setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
    // Selection is separate state; clear it along with the rows.
    table.resetRowSelection(true);
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex min-h-8 items-center justify-between gap-3">
        {selectedIds.length > 0 ? (
          <>
            <span className="font-medium text-sm">
              {selectedIds.length} selected
            </span>
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant="outline">
                <MailIcon aria-hidden="true" />
                Email
              </Button>
              <Button onClick={removeSelected} size="sm" variant="destructive">
                <UserMinusIcon aria-hidden="true" />
                Remove
              </Button>
              <Button
                aria-label="Clear selection"
                onClick={() => table.resetRowSelection(true)}
                size="icon-sm"
                variant="ghost"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">
            {members.length} members · Shift-click to select a range
          </span>
        )}
      </div>
      <div className="rounded-xl border bg-background">
        <DataTable
          emptyMessage={
            <Button
              onClick={() => setMembers(MEMBERS)}
              size="sm"
              variant="outline"
            >
              Restore members
            </Button>
          }
          table={table}
        />
      </div>
    </div>
  );
}
