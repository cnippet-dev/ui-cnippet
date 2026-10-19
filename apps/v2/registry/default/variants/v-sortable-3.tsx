// title: Horizontal shortcut tabs
"use client";

import {
  BarChart3Icon,
  HomeIcon,
  InboxIcon,
  type LucideIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { Sortable, SortableItem } from "@/registry/default/ui/sortable";

type Tab = { id: string; label: string; icon: LucideIcon };

const initial: Tab[] = [
  { icon: HomeIcon, id: "home", label: "Home" },
  { icon: InboxIcon, id: "inbox", label: "Inbox" },
  { icon: BarChart3Icon, id: "reports", label: "Reports" },
  { icon: UsersIcon, id: "team", label: "Team" },
  { icon: SettingsIcon, id: "settings", label: "Settings" },
];

export default function Particle() {
  const [tabs, setTabs] = useState(initial);

  return (
    <div className="flex flex-col items-center gap-3">
      <Sortable
        getItemValue={(t) => t.id}
        onValueChange={setTabs}
        orientation="horizontal"
        value={tabs}
      >
        <div className="flex gap-1 rounded-xl border bg-muted/40 p-1">
          {tabs.map((tab) => (
            <SortableItem
              asHandle
              className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 font-medium text-sm shadow-xs/5"
              key={tab.id}
              value={tab.id}
            >
              <tab.icon aria-hidden="true" className="size-4 opacity-72" />
              {tab.label}
            </SortableItem>
          ))}
        </div>
      </Sortable>
      <p className="text-muted-foreground text-xs">
        Drag the shortcuts into the order you use them.
      </p>
    </div>
  );
}
