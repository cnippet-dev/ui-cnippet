"use client";

import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type Permission = { label: string; value: string };

const permissions: Permission[] = [
  { label: "Read", value: "read" },
  { label: "Write", value: "write" },
  { label: "Delete", value: "delete" },
  { label: "Publish", value: "publish" },
  { label: "Manage users", value: "manage_users" },
  { label: "View analytics", value: "view_analytics" },
];

const allItems = [
  { label: "Select permissions", value: null } as {
    label: string;
    value: null;
  },
  ...permissions,
];

export default function Component() {
  const [selected, setSelected] = useState<Permission[]>([]);

  return (
    <div className="flex w-56 flex-col gap-3">
      <Select
        items={allItems}
        multiple
        onValueChange={(v) => setSelected(v as Permission[])}
        value={selected}
      >
        <SelectTrigger>
          {/* A multiple select's empty value is [], which never matches the
              null placeholder item, so render the empty state explicitly. */}
          <SelectValue>
            {(value: Permission[]) =>
              value.length === 0 ? (
                <span className="text-muted-foreground">
                  Select permissions
                </span>
              ) : value.length === 1 ? (
                value[0]?.label
              ) : (
                `${value.length} permissions`
              )
            }
          </SelectValue>
        </SelectTrigger>
        <SelectPopup>
          {permissions.map((item) => (
            <SelectItem key={item.value} value={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      {selected.length > 0 && (
        <p className="text-muted-foreground text-xs">
          Selected: {selected.map((p) => p.label).join(", ")}
        </p>
      )}
    </div>
  );
}
