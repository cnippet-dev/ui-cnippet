// title: Code editor with keyboard shortcuts
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const CODE = [
  'import { formatPrice } from "@/lib/format";',
  "",
  "export function PriceTag({ amount }: Props) {",
  "  const label = formatPrice(amount);",
  '  return <span className="tag">{label}</span>;',
  "}",
];

export function ContextMenuShortcuts() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-background shadow-xs/5">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="font-mono text-muted-foreground text-xs">
          price-tag.tsx
        </span>
        <span className="text-muted-foreground text-xs">
          <span className="pointer-fine:inline hidden">Right-click code</span>
          <span className="pointer-coarse:inline hidden">Long-press code</span>
        </span>
      </div>
      <ContextMenu>
        <ContextMenuTrigger className="block overflow-x-auto py-3 font-mono text-xs leading-6">
          {CODE.map((line, i) => (
            <div className="flex" key={`${i}-${line}`}>
              <span className="w-10 shrink-0 select-none pe-3 text-end text-muted-foreground/60">
                {i + 1}
              </span>
              <span className="whitespace-pre text-foreground/90">{line}</span>
            </div>
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-60">
          <ContextMenuGroup>
            <ContextMenuItem>
              Go to Definition
              <ContextMenuShortcut>F12</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to References
              <ContextMenuShortcut>⇧F12</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Rename Symbol
              <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Paste
              <ContextMenuShortcut>⌘V</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Format Document
              <ContextMenuShortcut>⇧⌥F</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Command Palette
              <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
