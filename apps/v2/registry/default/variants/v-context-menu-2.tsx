// title: Media library with Move to and Share submenus
"use client";

import {
  CopyIcon,
  DownloadIcon,
  FolderIcon,
  FolderInputIcon,
  FolderPlusIcon,
  ImageIcon,
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  Share2Icon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const FOLDERS = ["Brand", "Campaigns", "Archive"];

const INITIAL_ASSETS = [
  { folder: "Brand", id: "a1", name: "logo-mark.svg" },
  { folder: "Campaigns", id: "a2", name: "launch-hero.png" },
  { folder: "Campaigns", id: "a3", name: "pricing-og.png" },
  { folder: "Brand", id: "a4", name: "team-offsite.jpg" },
];

export function ContextMenuSubmenu() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);

  const moveTo = (id: string, folder: string) =>
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, folder } : a)));

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {assets.map((asset) => (
          <ContextMenu key={asset.id}>
            <ContextMenuTrigger className="group block overflow-hidden rounded-lg border bg-background">
              <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                <ImageIcon
                  aria-hidden="true"
                  className="size-6 text-muted-foreground/60"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                <span className="truncate font-medium text-xs">
                  {asset.name}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                  <FolderIcon aria-hidden="true" className="size-3" />
                  {asset.folder}
                </span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuGroup>
                <ContextMenuItem>
                  <DownloadIcon />
                  Download
                </ContextMenuItem>
                <ContextMenuItem>
                  <CopyIcon />
                  Duplicate
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <FolderInputIcon />
                    Move to
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-40">
                    <ContextMenuGroup>
                      {FOLDERS.map((folder) => (
                        <ContextMenuItem
                          disabled={folder === asset.folder}
                          key={folder}
                          onClick={() => moveTo(asset.id, folder)}
                        >
                          <FolderIcon />
                          {folder}
                        </ContextMenuItem>
                      ))}
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem>
                        <FolderPlusIcon />
                        New folder…
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Share2Icon />
                    Share
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-40">
                    <ContextMenuGroup>
                      <ContextMenuItem>
                        <LinkIcon />
                        Copy link
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <MailIcon />
                        Email
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <MessageSquareIcon />
                        Send to Slack
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuSubContent>
                </ContextMenuSub>
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
      <p className="text-muted-foreground text-xs">
        <span className="pointer-fine:inline hidden">
          Right-click an asset to move or share it.
        </span>
        <span className="pointer-coarse:inline hidden">
          Long-press an asset to move or share it.
        </span>
      </p>
    </div>
  );
}
