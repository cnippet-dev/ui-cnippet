"use client";

import {
  DownloadIcon,
  FolderOpenIcon,
  InfoIcon,
  PencilIcon,
  RefreshCwIcon,
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

type FileItem = {
  ext: string;
  id: string;
  modified: string;
  name: string;
  size: string;
};

const FILES: FileItem[] = [
  {
    ext: "tsx",
    id: "f1",
    modified: "2m ago",
    name: "button.tsx",
    size: "4.2 KB",
  },
  { ext: "ts", id: "f2", modified: "1h ago", name: "utils.ts", size: "1.8 KB" },
  {
    ext: "mdx",
    id: "f3",
    modified: "3h ago",
    name: "readme.mdx",
    size: "8.6 KB",
  },
  {
    ext: "json",
    id: "f4",
    modified: "1d ago",
    name: "package.json",
    size: "2.1 KB",
  },
];

const extColor: Record<string, string> = {
  json: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  mdx: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  ts: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  tsx: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
};

export function Pattern() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm space-y-0.5 rounded-xl border p-1">
      {FILES.map((file) => (
        <ContextMenu key={file.id}>
          <ContextMenuTrigger
            className={`flex w-full cursor-default items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${selected === file.id ? "bg-muted" : ""}`}
            onClick={() => setSelected(file.id)}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`rounded px-1.5 py-0.5 font-mono font-semibold text-[10px] ${extColor[file.ext] ?? "bg-muted text-muted-foreground"}`}
              >
                .{file.ext}
              </span>
              <span>{file.name}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              {file.modified}
            </span>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-44">
            <ContextMenuGroup>
              <ContextMenuItem>
                <FolderOpenIcon />
                Open
              </ContextMenuItem>
              <ContextMenuItem>
                <PencilIcon />
                Rename
              </ContextMenuItem>
              <ContextMenuItem>
                <DownloadIcon />
                Download
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>
                <InfoIcon />
                <span>
                  Get info
                  <span className="ml-auto text-muted-foreground text-xs">
                    {file.size}
                  </span>
                </span>
              </ContextMenuItem>
              <ContextMenuItem>
                <RefreshCwIcon />
                Refresh
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
