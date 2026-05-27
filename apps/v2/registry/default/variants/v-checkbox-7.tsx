"use client";

import { useId, useState } from "react";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";

const permissions = [
  { id: "read", label: "Read", description: "View all resources" },
  { id: "write", label: "Write", description: "Create and edit resources" },
  { id: "delete", label: "Delete", description: "Remove resources permanently" },
  { id: "admin", label: "Admin", description: "Manage members and billing" },
];

export function Pattern() {
  const parentId = useId();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    admin: false,
    delete: false,
    read: true,
    write: true,
  });

  const values = Object.values(checked);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean) && !allChecked;

  const toggleAll = () => {
    const next = !allChecked;
    setChecked(Object.fromEntries(permissions.map((p) => [p.id, next])));
  };

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allChecked}
          id={parentId}
          indeterminate={someChecked}
          onCheckedChange={toggleAll}
        />
        <Label htmlFor={parentId} className="font-semibold">
          {allChecked ? "Deselect all" : "Select all permissions"}
        </Label>
      </div>

      <Separator />

      <div className="space-y-2.5 pl-1">
        {permissions.map((perm) => (
          <div className="flex items-start gap-2.5" key={perm.id}>
            <Checkbox
              checked={checked[perm.id]}
              id={perm.id}
              onCheckedChange={(val) =>
                setChecked((prev) => ({ ...prev, [perm.id]: !!val }))
              }
            />
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={perm.id}>{perm.label}</Label>
              <p className="text-muted-foreground text-xs">{perm.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
