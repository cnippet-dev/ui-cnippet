"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

export default function Variant() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="user-select-none flex h-48 w-60 items-center justify-center rounded-md border border-gray-300 text-gray-900">
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
