import {
  BellIcon,
  FolderIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const sections = [
  {
    items: [
      { Icon: LayoutDashboardIcon, label: "Overview" },
      { Icon: FolderIcon, label: "Projects" },
      { Icon: UsersIcon, label: "Team" },
    ],
    title: "Workspace",
  },
  {
    items: [
      { Icon: SettingsIcon, label: "General" },
      { Icon: ShieldIcon, label: "Security" },
      { Icon: UsersIcon, label: "Members" },
    ],
    title: "Settings",
  },
  {
    items: [
      { Icon: FolderIcon, label: "Assets" },
      { Icon: LayoutDashboardIcon, label: "Analytics" },
      { Icon: BellIcon, label: "Alerts" },
    ],
    title: "Resources",
  },
];

export default function Particle() {
  return (
    <ScrollArea className="h-72 w-48 rounded-lg border">
      <div className="flex flex-col gap-4 p-3">
        {sections.map(({ items, title }) => (
          <div key={title}>
            <p className="mb-1 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              {title}
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map(({ Icon, label }, idx) => (
                <button
                  className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent ${title === "Workspace" && idx === 0 ? "bg-accent" : ""}`}
                  key={label}
                  type="button"
                >
                  <Icon aria-hidden="true" className="size-4 opacity-70" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
