// title: Dashboard widget grid
"use client";

import { useState } from "react";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/registry/default/ui/sortable";

type Widget = { id: string; label: string; value: string; delta: string };

const initial: Widget[] = [
  { delta: "+12%", id: "revenue", label: "Revenue", value: "$48.2k" },
  { delta: "+4%", id: "users", label: "Active users", value: "2,814" },
  { delta: "-2%", id: "churn", label: "Churn", value: "1.9%" },
  { delta: "+8%", id: "orders", label: "Orders", value: "1,206" },
  { delta: "+1%", id: "nps", label: "NPS", value: "62" },
  { delta: "-5%", id: "tickets", label: "Open tickets", value: "37" },
];

export default function Particle() {
  const [widgets, setWidgets] = useState(initial);

  return (
    <div className="w-full max-w-lg">
      <p className="mb-3 text-muted-foreground text-xs">
        Rearrange your dashboard by dragging a card's handle.
      </p>
      <Sortable
        getItemValue={(w) => w.id}
        onValueChange={setWidgets}
        orientation="grid"
        value={widgets}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {widgets.map((w) => (
            <SortableItem
              className="rounded-xl border bg-background p-3"
              key={w.id}
              value={w.id}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-muted-foreground text-xs">{w.label}</p>
                <SortableItemHandle className="-me-1 -mt-1 size-6" />
              </div>
              <p className="mt-1 font-semibold text-lg tabular-nums">
                {w.value}
              </p>
              <p
                className={
                  w.delta.startsWith("-")
                    ? "text-destructive-foreground text-xs"
                    : "text-success-foreground text-xs"
                }
              >
                {w.delta} vs last month
              </p>
            </SortableItem>
          ))}
        </div>
      </Sortable>
    </div>
  );
}
