"use client";

import { FileIcon, FileTextIcon, FolderIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

type SortKey = "name" | "modified" | "size";

const FILES = [
  { icon: FolderIcon, modified: 5, name: "Invoices", size: 0 },
  { icon: FileTextIcon, modified: 1, name: "Roadmap.pdf", size: 2400 },
  { icon: ImageIcon, modified: 3, name: "Banner.png", size: 860 },
  { icon: FileIcon, modified: 2, name: "Budget.xlsx", size: 120 },
  { icon: FileTextIcon, modified: 4, name: "Notes.md", size: 8 },
];

const SORTERS: Record<
  SortKey,
  (a: (typeof FILES)[0], b: (typeof FILES)[0]) => number
> = {
  modified: (a, b) => a.modified - b.modified,
  name: (a, b) => a.name.localeCompare(b.name),
  size: (a, b) => b.size - a.size,
};

function formatSize(kb: number) {
  if (kb === 0) return "—";
  return kb >= 1000 ? `${(kb / 1000).toFixed(1)} MB` : `${kb} KB`;
}

export function ContextMenuRadio() {
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [view, setView] = useState("grid");
  const files = [...FILES].sort(SORTERS[sortBy]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="block w-full max-w-md rounded-xl border bg-background p-3 shadow-xs/5">
        <div className="mb-3 flex items-baseline justify-between px-1">
          <p className="font-semibold text-sm">Q3 Planning</p>
          <p className="text-muted-foreground text-xs">
            <span className="pointer-fine:inline hidden">
              Right-click to sort or change view
            </span>
            <span className="pointer-coarse:inline hidden">
              Long-press to sort or change view
            </span>
          </p>
        </div>
        <div
          className={cn(
            view === "grid"
              ? "grid grid-cols-5 gap-2"
              : "flex flex-col gap-0.5",
          )}
        >
          {files.map((file) =>
            view === "grid" ? (
              <div
                className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center"
                key={file.name}
              >
                <file.icon
                  aria-hidden="true"
                  className="size-7 text-muted-foreground"
                />
                <span className="w-full truncate text-[11px]">{file.name}</span>
              </div>
            ) : (
              <div
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm"
                key={file.name}
              >
                <file.icon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
                <span className="flex-1 truncate">{file.name}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {formatSize(file.size)}
                </span>
              </div>
            ),
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuRadioGroup
          onValueChange={(value) => setSortBy(value as SortKey)}
          value={sortBy}
        >
          <ContextMenuLabel>Sort by</ContextMenuLabel>
          <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
          <ContextMenuRadioItem value="modified">
            Date modified
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup onValueChange={setView} value={view}>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuRadioItem value="grid">Icons</ContextMenuRadioItem>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>New folder</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
