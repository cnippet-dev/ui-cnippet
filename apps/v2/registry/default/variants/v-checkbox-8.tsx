"use client";

import { useState } from "react";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { Separator } from "@/registry/default/ui/separator";

const labels = [
  { color: "bg-red-500", id: "bug", name: "bug" },
  { color: "bg-blue-500", id: "feature", name: "feature" },
  { color: "bg-yellow-500", id: "improvement", name: "improvement" },
  { color: "bg-green-500", id: "documentation", name: "documentation" },
  { color: "bg-purple-500", id: "design", name: "design" },
  { color: "bg-orange-500", id: "performance", name: "performance" },
  { color: "bg-pink-500", id: "security", name: "security" },
  { color: "bg-cyan-500", id: "testing", name: "testing" },
];

export function Pattern() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["bug", "feature"]),
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Labels</p>
        <span className="text-muted-foreground text-xs">
          {selected.size} selected
        </span>
      </div>
      <Separator />
      <div className="space-y-0.5">
        {labels.map((label) => (
          <label
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-accent"
            htmlFor={label.id}
            key={label.id}
          >
            <Checkbox
              checked={selected.has(label.id)}
              id={label.id}
              onCheckedChange={() => toggle(label.id)}
            />
            <span className={`size-2.5 shrink-0 rounded-full ${label.color}`} />
            <span className="text-sm">{label.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
