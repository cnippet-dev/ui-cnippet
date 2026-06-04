import { EditIcon, SearchIcon, UndoIcon } from "lucide-react";
import { Fragment } from "react";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import { Separator } from "@/registry/default/ui/separator";

const shortcuts = [
  {
    icon: SearchIcon,
    label: "Open command palette",
    mac: ["⌘", "K"],
    win: ["Ctrl", "K"],
  },
  {
    icon: EditIcon,
    label: "Find and replace",
    mac: ["⌘", "H"],
    win: ["Ctrl", "H"],
  },
  {
    icon: UndoIcon,
    label: "Undo last action",
    mac: ["⌘", "Z"],
    win: ["Ctrl", "Z"],
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-0">
        <span className="pb-2 font-medium text-muted-foreground text-xs">
          Action
        </span>
        <span className="pb-2 font-medium text-muted-foreground text-xs">
          Mac
        </span>
        <span className="pb-2 font-medium text-muted-foreground text-xs">
          Win / Linux
        </span>
        <Separator className="col-span-3" />
        {shortcuts.map(({ icon: Icon, label, mac, win }) => (
          <Fragment key={label}>
            <div className="flex items-center gap-2 py-2.5">
              <Icon
                aria-hidden="true"
                className="size-3.5 text-muted-foreground"
              />
              <span className="text-sm">{label}</span>
            </div>
            <KbdGroup className="py-2.5">
              {mac.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </KbdGroup>
            <KbdGroup className="py-2.5">
              {win.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </KbdGroup>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
