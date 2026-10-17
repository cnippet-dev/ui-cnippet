"use client";

import {
  ArrowDownToLineIcon,
  ArrowLeftToLineIcon,
  ArrowUpToLineIcon,
  ClipboardPasteIcon,
  CopyIcon,
  MessageSquarePlusIcon,
  ScissorsIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const COLUMNS = ["Region", "Q1", "Q2", "Q3"];
const ROWS = [
  ["North", "42,100", "45,800", "51,200"],
  ["South", "38,400", "36,900", "40,150"],
  ["West", "29,700", "33,250", "35,900"],
];

export function ContextMenuIcons() {
  const [active, setActive] = useState("0-1");

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="overflow-hidden rounded-lg border bg-background text-sm shadow-xs/5">
        <div className="grid grid-cols-4 border-b bg-muted/50 font-medium text-muted-foreground text-xs">
          {COLUMNS.map((column) => (
            <div className="border-e px-3 py-1.5 last:border-e-0" key={column}>
              {column}
            </div>
          ))}
        </div>
        {ROWS.map((row, r) => (
          <div
            className="grid grid-cols-4 border-b last:border-b-0"
            key={row[0]}
          >
            {row.map((value, c) => {
              const id = `${r}-${c}`;
              return (
                <ContextMenu key={id}>
                  <ContextMenuTrigger
                    className={cn(
                      "border-e px-3 py-1.5 tabular-nums last:border-e-0",
                      c > 0 && "text-end",
                      active === id &&
                        "bg-primary/8 outline-2 outline-primary -outline-offset-2",
                    )}
                    onContextMenu={() => setActive(id)}
                    onPointerDown={() => setActive(id)}
                  >
                    {value}
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-52">
                    <ContextMenuGroup>
                      <ContextMenuItem>
                        <ScissorsIcon />
                        Cut
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <CopyIcon />
                        Copy
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <ClipboardPasteIcon />
                        Paste
                      </ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem>
                        <ArrowUpToLineIcon />
                        Insert row above
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <ArrowDownToLineIcon />
                        Insert row below
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <ArrowLeftToLineIcon />
                        Insert column left
                      </ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem>
                        <MessageSquarePlusIcon />
                        Add comment
                      </ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem variant="destructive">
                        <Trash2Icon />
                        Delete row
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        <span className="pointer-fine:inline hidden">
          Right-click any cell.
        </span>
        <span className="pointer-coarse:inline hidden">
          Long-press any cell.
        </span>
      </p>
    </div>
  );
}
