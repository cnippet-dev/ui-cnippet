"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "@/registry/default/ui/context-menu";

export default function Variant() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-center w-60 h-48 border border-gray-300 text-gray-900 rounded-md user-select-none">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Music</ContextMenuLabel>
        <ContextMenuItem>
          Add to Library
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Add to Playlist
          <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Play Next</ContextMenuItem>
        <ContextMenuItem>Play Last</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Favorite</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}