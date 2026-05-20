import { KeyboardIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const groups = [
  {
    label: "Navigation",
    shortcuts: [
      { description: "Go to home", keys: ["G", "H"] },
      { description: "Go to projects", keys: ["G", "P"] },
      { description: "Go to settings", keys: ["G", "S"] },
    ],
  },
  {
    label: "Actions",
    shortcuts: [
      { description: "Open command menu", keys: ["⌘", "K"] },
      { description: "Create new item", keys: ["⌘", "N"] },
      { description: "Toggle shortcuts", keys: ["⌘", "/"] },
    ],
  },
] as const;

export function Pattern() {
  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <KeyboardIcon aria-hidden="true" />
          Shortcuts
        </PopoverTrigger>
        <PopoverContent align="center" className="w-64 gap-0 p-0">
          <div className="border-b px-0 py-3">
            <h4 className="font-semibold text-sm">Keyboard Shortcuts</h4>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Speed up your workflow.
            </p>
          </div>
          <div className="divide-y">
            {groups.map((group) => (
              <div className="space-y-2 px-0 py-3" key={group.label}>
                <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="space-y-2">
                  {group.shortcuts.map(({ keys, description }) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={description}
                    >
                      <span className="text-muted-foreground text-sm">
                        {description}
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        {keys.map((key) => (
                          <Kbd key={key}>{key}</Kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t px-0 py-2.5">
            <p className="flex items-center gap-1 text-muted-foreground text-xs">
              Press <Kbd>⌘</Kbd> <Kbd>/</Kbd> to open anytime.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
