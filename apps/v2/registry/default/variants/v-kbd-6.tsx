import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import { Separator } from "@/registry/default/ui/separator";

const shortcuts = [
  { keys: ["⌘", "K"], label: "Search" },
  { keys: ["⌘", "N"], label: "New File" },
  { keys: ["⌘", "S"], label: "Save" },
  { keys: ["⌘", "Z"], label: "Undo" },
  { keys: ["⌘", "⇧", "Z"], label: "Redo" },
];

export function Pattern() {
  return (
    <div className="mx-auto flex flex-col">
      <p className="mb-3 font-medium text-sm">Keyboard Shortcuts</p>
      <Separator />
      <div className="flex flex-col">
        {shortcuts.map((shortcut) => (
          <div
            className="flex items-center justify-between border-b py-2.5 last:border-b-0"
            key={shortcut.label}
          >
            <span className="text-muted-foreground text-sm">
              {shortcut.label}
            </span>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </div>
    </div>
  );
}
