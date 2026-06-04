"use client";

import { KanbanIcon, LayoutListIcon, TableIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

type View = "list" | "table" | "board";

const views: { id: View; icon: typeof LayoutListIcon; label: string }[] = [
  { icon: LayoutListIcon, id: "list", label: "List" },
  { icon: TableIcon, id: "table", label: "Table" },
  { icon: KanbanIcon, id: "board", label: "Board" },
];

export function Pattern() {
  const [view, setView] = useState<View>("list");

  return (
    <div className="flex flex-col items-center gap-4">
      <Group aria-label="View mode">
        {views.map((v, i) => (
          <Fragment key={v.id}>
            {i > 0 && <GroupSeparator />}
            <Button
              aria-pressed={view === v.id}
              onClick={() => setView(v.id)}
              size="sm"
              variant={view === v.id ? "default" : "ghost"}
            >
              <v.icon className="size-4" />
              {v.label}
            </Button>
          </Fragment>
        ))}
      </Group>
      <p className="text-muted-foreground text-sm">
        Viewing as:{" "}
        <span className="font-medium text-foreground capitalize">{view}</span>
      </p>
    </div>
  );
}
