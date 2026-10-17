"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const COLUMNS = [
  { id: "name", label: "Name", locked: true },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "lastActive", label: "Last active" },
] as const;

type ColumnId = (typeof COLUMNS)[number]["id"];

const MEMBERS: Record<ColumnId, string>[] = [
  {
    email: "alice@acme.dev",
    lastActive: "2m ago",
    name: "Alice Park",
    role: "Admin",
  },
  {
    email: "ben@acme.dev",
    lastActive: "1h ago",
    name: "Ben Torres",
    role: "Member",
  },
  {
    email: "celia@acme.dev",
    lastActive: "Yesterday",
    name: "Celia Kim",
    role: "Member",
  },
];

const DEFAULT_VISIBLE: ColumnId[] = ["name", "email", "role"];

export function ContextMenuCheckboxes() {
  const [visible, setVisible] = useState<ColumnId[]>(DEFAULT_VISIBLE);
  const shown = COLUMNS.filter((c) => visible.includes(c.id));

  const toggle = (id: ColumnId, checked: boolean) =>
    setVisible((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id),
    );

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="overflow-hidden rounded-lg border bg-background shadow-xs/5">
        <table className="w-full text-sm">
          <ContextMenu>
            <ContextMenuTrigger render={<thead />}>
              <tr className="border-b bg-muted/50 text-start text-muted-foreground text-xs">
                {shown.map((column) => (
                  <th
                    className="px-3 py-2 text-start font-medium"
                    key={column.id}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuGroup>
                <ContextMenuLabel>Columns</ContextMenuLabel>
                {COLUMNS.map((column) => (
                  <ContextMenuCheckboxItem
                    checked={visible.includes(column.id)}
                    disabled={"locked" in column}
                    key={column.id}
                    onCheckedChange={(checked) => toggle(column.id, checked)}
                  >
                    {column.label}
                  </ContextMenuCheckboxItem>
                ))}
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem onClick={() => setVisible(DEFAULT_VISIBLE)}>
                  Reset columns
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
          <tbody>
            {MEMBERS.map((member) => (
              <tr className="border-b last:border-b-0" key={member.email}>
                {shown.map((column) => (
                  <td
                    className="px-3 py-2 first:font-medium [&:not(:first-child)]:text-muted-foreground"
                    key={column.id}
                  >
                    {member[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground text-xs">
        <span className="pointer-fine:inline hidden">
          Right-click the header to show or hide columns.
        </span>
        <span className="pointer-coarse:inline hidden">
          Long-press the header to show or hide columns.
        </span>
      </p>
    </div>
  );
}
