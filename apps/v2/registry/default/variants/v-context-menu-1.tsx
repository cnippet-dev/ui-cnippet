"use client";

import { LockIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const BOOKMARKS = ["Dashboard", "Pull requests", "Design system"];

export function ContextMenuDemo() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [profile, setProfile] = useState("work");

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-background shadow-xs/5">
      <div className="flex items-center gap-3 border-b bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-muted-foreground text-xs">
          <LockIcon aria-hidden="true" className="size-3 shrink-0" />
          <span className="truncate">
            {showFullUrls
              ? "https://acme.dev/docs/getting-started"
              : "acme.dev/docs/getting-started"}
          </span>
        </div>
        <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-[10px] text-primary-foreground capitalize">
          {profile}
        </span>
      </div>
      {showBookmarks && (
        <div className="flex gap-3 border-b px-3 py-1.5 text-muted-foreground text-xs">
          {BOOKMARKS.map((bookmark) => (
            <span className="flex items-center gap-1" key={bookmark}>
              <StarIcon aria-hidden="true" className="size-3" />
              {bookmark}
            </span>
          ))}
        </div>
      )}
      <ContextMenu>
        <ContextMenuTrigger className="block space-y-3 p-5">
          <p className="font-semibold text-sm">Getting started</p>
          <p className="text-muted-foreground text-sm">
            Install the CLI, add your first component and ship it.
          </p>
          <p className="text-muted-foreground text-xs">
            <span className="pointer-fine:inline hidden">
              Right-click the page for browser options.
            </span>
            <span className="pointer-coarse:inline hidden">
              Long-press the page for browser options.
            </span>
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuGroup>
                  <ContextMenuItem>Save page as…</ContextMenuItem>
                  <ContextMenuItem>Create shortcut…</ContextMenuItem>
                  <ContextMenuItem>Name window…</ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>Developer tools</ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuCheckboxItem
              checked={showBookmarks}
              onCheckedChange={setShowBookmarks}
            >
              Show bookmarks bar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={showFullUrls}
              onCheckedChange={setShowFullUrls}
            >
              Show full URLs
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup onValueChange={setProfile} value={profile}>
            <ContextMenuLabel>Profile</ContextMenuLabel>
            <ContextMenuRadioItem value="work">Work</ContextMenuRadioItem>
            <ContextMenuRadioItem value="personal">
              Personal
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
