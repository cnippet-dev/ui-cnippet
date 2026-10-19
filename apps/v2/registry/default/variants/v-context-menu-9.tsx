// title: Canvas layers opening on each side
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  LockIcon,
  TrashIcon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

// Each layer sits against one edge of the canvas, so its menu opens inward.
const LAYERS = [
  {
    className: "top-3 left-1/2 -translate-x-1/2",
    name: "Header",
    side: "bottom",
  },
  {
    className: "top-1/2 right-3 -translate-y-1/2",
    name: "Sidebar",
    side: "left",
  },
  {
    className: "bottom-3 left-1/2 -translate-x-1/2",
    name: "Footer",
    side: "top",
  },
  {
    className: "top-1/2 left-3 -translate-y-1/2",
    name: "Toolbar",
    side: "right",
  },
] as const;

export function ContextMenuSides() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-md rounded-xl border bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-background [background-size:16px_16px]">
      <p className="absolute inset-0 m-auto h-fit text-center text-muted-foreground text-xs">
        <span className="pointer-fine:inline hidden">Right-click a layer</span>
        <span className="pointer-coarse:inline hidden">Long-press a layer</span>
      </p>
      {LAYERS.map((layer) => (
        <ContextMenu key={layer.name}>
          <ContextMenuTrigger
            className={`absolute rounded-md border bg-background px-3 py-1.5 font-medium text-xs shadow-xs/5 data-popup-open:border-primary ${layer.className}`}
          >
            {layer.name}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-44" side={layer.side}>
            <ContextMenuGroup>
              <ContextMenuItem>
                <ArrowUpIcon />
                Bring forward
              </ContextMenuItem>
              <ContextMenuItem>
                <ArrowDownIcon />
                Send backward
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon />
                Duplicate
              </ContextMenuItem>
              <ContextMenuItem>
                <LockIcon />
                Lock
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
}
