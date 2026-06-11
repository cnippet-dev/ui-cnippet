"use client";

import {
  CopyIcon,
  EditIcon,
  ExternalLinkIcon,
  LinkIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const LINKS = [
  { href: "#", label: "Design Systems 101" },
  { href: "#", label: "Component Architecture" },
  { href: "#", label: "Accessibility Guide" },
  { href: "#", label: "Tailwind Best Practices" },
];

export function Pattern() {
  const [starred, setStarred] = useState<Set<string>>(new Set());

  return (
    <div className="w-full max-w-xs space-y-1 rounded-xl border p-2">
      {LINKS.map((link) => (
        <ContextMenu key={link.label}>
          <ContextMenuTrigger className="flex w-full cursor-default items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted">
            <span>{link.label}</span>
            {starred.has(link.label) && (
              <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
            )}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuGroup>
              <ContextMenuItem>
                <ExternalLinkIcon />
                Open
              </ContextMenuItem>
              <ContextMenuItem>
                <LinkIcon />
                Copy link
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>
                <EditIcon />
                Rename
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() =>
                  setStarred((prev) => {
                    const next = new Set(prev);
                    next.has(link.label)
                      ? next.delete(link.label)
                      : next.add(link.label);
                    return next;
                  })
                }
              >
                <StarIcon />
                {starred.has(link.label) ? "Unstar" : "Star"}
              </ContextMenuItem>
              <ContextMenuItem>
                <ShareIcon />
                Share
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon />
                Duplicate
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
