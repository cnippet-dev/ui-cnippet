import { KeyboardIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const shortcuts = [
  {
    items: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["⌘", "P"], label: "Quick file open" },
      { keys: ["⌘", "Shift", "F"], label: "Search in project" },
      { keys: ["⌘", "/"], label: "Toggle comment" },
    ],
    section: "General",
  },
  {
    items: [
      { keys: ["⌘", "S"], label: "Save file" },
      { keys: ["⌘", "Z"], label: "Undo" },
      { keys: ["⌘", "Shift", "Z"], label: "Redo" },
      { keys: ["⌘", "D"], label: "Duplicate line" },
    ],
    section: "Editor",
  },
  {
    items: [
      { keys: ["⌘", "B"], label: "Toggle sidebar" },
      { keys: ["⌘", "J"], label: "Toggle panel" },
      { keys: ["⌘", "`"], label: "Toggle terminal" },
    ],
    section: "View",
  },
];

export default function Particle() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <KeyboardIcon aria-hidden="true" />
        Shortcuts
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Keyboard Shortcuts</SheetTitle>
          <SheetDescription>
            A quick reference for available keyboard shortcuts.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="space-y-4">
          {shortcuts.map(({ items, section }, i) => (
            <div key={section}>
              {i > 0 && <Separator className="mb-4" />}
              <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {section}
              </p>
              <div className="space-y-1">
                {items.map(({ keys, label }) => (
                  <div
                    className="flex items-center justify-between py-1"
                    key={label}
                  >
                    <span className="text-sm">{label}</span>
                    <div className="flex items-center gap-1">
                      {keys.map((k) => (
                        <Badge
                          className="h-5 rounded px-1.5 font-mono text-[10px]"
                          key={k}
                          variant="outline"
                        >
                          {k}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button className="w-full" variant="outline" />}>
            Close
          </SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
