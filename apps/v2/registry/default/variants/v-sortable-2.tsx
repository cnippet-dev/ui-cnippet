// title: Drag-to-rank list
"use client";

import { useState } from "react";
import { Sortable, SortableItem } from "@/registry/default/ui/sortable";

const initial = [
  "Faster page loads",
  "Dark mode for email",
  "Better search",
  "Offline support",
  "Two-factor login",
];

export default function Particle() {
  const [items, setItems] = useState(initial);

  return (
    <div className="w-full max-w-xs">
      <p className="font-medium text-sm">Rank what matters most</p>
      <p className="mb-3 text-muted-foreground text-xs">
        Drag to reorder. #1 is your top pick.
      </p>
      <Sortable getItemValue={(i) => i} onValueChange={setItems} value={items}>
        <ol className="flex flex-col gap-1.5">
          {items.map((item, index) => (
            <li key={item}>
              <SortableItem
                asHandle
                className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2 text-sm"
                value={item}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent font-medium text-xs tabular-nums">
                  {index + 1}
                </span>
                {item}
              </SortableItem>
            </li>
          ))}
        </ol>
      </Sortable>
    </div>
  );
}
