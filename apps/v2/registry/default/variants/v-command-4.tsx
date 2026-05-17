"use client";

import { FileIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";
import { Kbd } from "@/registry/default/ui/kbd";

const files = [
  { name: "page.tsx", path: "src/app/page.tsx", type: "tsx" },
  { name: "layout.tsx", path: "src/app/layout.tsx", type: "tsx" },
  { name: "globals.css", path: "src/styles/globals.css", type: "css" },
  { name: "utils.ts", path: "src/lib/utils.ts", type: "ts" },
  { name: "api.ts", path: "src/lib/api.ts", type: "ts" },
  { name: "button.tsx", path: "src/components/ui/button.tsx", type: "tsx" },
  { name: "package.json", path: "package.json", type: "json" },
  { name: "README.md", path: "README.md", type: "md" },
];

type File = (typeof files)[number];

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        render={<Button className="w-52" variant="outline" />}
      >
        <SearchIcon className="size-4 shrink-0" />
        Search files...
        <Kbd className="ml-auto">⌘K</Kbd>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={files}>
          <CommandInput placeholder="Search files by name..." />
          <CommandPanel>
            <CommandEmpty>No files found.</CommandEmpty>
            <CommandList>
              {(file: File) => (
                <CommandItem
                  className="gap-2"
                  key={file.path}
                  value={file.name}
                >
                  <FileIcon className="size-4 shrink-0" />
                  <div className="flex flex-1 items-center gap-2 overflow-hidden">
                    <span className="font-medium">{file.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {file.path}
                    </span>
                  </div>
                  <div className="ml-auto" data-slot="command-shortcut">
                    <Badge size="sm" variant="outline">
                      {file.type}
                    </Badge>
                  </div>
                </CommandItem>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
