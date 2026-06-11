"use client";

import { useId, useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Checkbox } from "@/registry/default/ui/checkbox";

const PERMISSIONS = [
  {
    description: "View dashboards, reports, and analytics.",
    id: "read",
    label: "Read",
    variant: "secondary" as const,
  },
  {
    description: "Create and modify records, posts, and settings.",
    id: "write",
    label: "Write",
    variant: "info" as const,
  },
  {
    description: "Remove records and bulk-delete resources.",
    id: "delete",
    label: "Delete",
    variant: "warning" as const,
  },
  {
    description: "Invite members, change roles, and manage billing.",
    id: "admin",
    label: "Admin",
    variant: "destructive" as const,
  },
];

export function Pattern() {
  const id = useId();
  const [selected, setSelected] = useState<Set<string>>(new Set(["read"]));

  const toggle = (pid: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(pid) ? next.delete(pid) : next.add(pid);
      return next;
    });

  return (
    <div className="w-full max-w-sm space-y-2">
      <p className="font-semibold text-sm">Role Permissions</p>
      <div className="space-y-1">
        {PERMISSIONS.map((perm) => (
          <label
            className="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-muted/50"
            htmlFor={`${id}-${perm.id}`}
            key={perm.id}
          >
            <Checkbox
              checked={selected.has(perm.id)}
              className="mt-0.5"
              id={`${id}-${perm.id}`}
              onCheckedChange={() => toggle(perm.id)}
            />
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{perm.label}</span>
                <Badge size="sm" variant={perm.variant}>
                  {perm.id}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs">
                {perm.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
