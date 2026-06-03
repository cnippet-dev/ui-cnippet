import { FileTextIcon, FolderIcon, SettingsIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

const results = [
  {
    description: "Updated 2 hours ago",
    icon: FileTextIcon,
    kbd: ["↵"],
    label: "Getting started guide",
  },
  {
    description: "12 documents",
    icon: FolderIcon,
    kbd: ["↵"],
    label: "Design resources",
  },
  {
    description: "Workspace · Billing",
    icon: SettingsIcon,
    kbd: ["↵"],
    label: "Account settings",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-popover shadow-md">
      <div className="border-b px-3 py-2">
        <p className="text-muted-foreground text-xs">Recent</p>
      </div>
      <ul>
        {results.map(({ description, icon: Icon, kbd, label }, i) => (
          <li
            className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-accent ${i === 0 ? "bg-accent" : ""}`}
            key={label}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">{label}</span>
              <span className="truncate text-muted-foreground text-xs">{description}</span>
            </div>
            <KbdGroup className="shrink-0">
              {kbd.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </KbdGroup>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 border-t px-3 py-2">
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <KbdGroup><Kbd>↑</Kbd><Kbd>↓</Kbd></KbdGroup> navigate
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <Kbd>↵</Kbd> open
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <Kbd>Esc</Kbd> close
        </span>
      </div>
    </div>
  );
}
