"use client";

import {
  ChevronRightIcon,
  DownloadIcon,
  FileIcon,
  FolderIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent, CardHeader } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";
import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const fileTree: FileTreeItem[] = [
  {
    items: [
      {
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
        ],
        name: "ui",
      },
      { name: "login-form.tsx" },
    ],
    name: "components",
  },
  {
    items: [{ name: "utils.ts" }, { name: "api.ts" }],
    name: "lib",
  },
  {
    items: [{ name: "use-debounce.ts" }, { name: "use-local-storage.ts" }],
    name: "hooks",
  },
  { name: "app.tsx" },
  { name: "package.json" },
];

function TreeItem({
  item,
  level = 0,
  selectedId,
  onSelect,
}: {
  item: FileTreeItem;
  level?: number;
  selectedId?: string | null;
  onSelect?: (name: string) => void;
}) {
  const isFolder = "items" in item;
  const isSelected = selectedId === item.name;

  if (isFolder) {
    return (
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger
          nativeButton={false}
          render={
            <Item
              className="cursor-pointer py-1.5 hover:bg-accent data-[state=open]:bg-accent"
              size="xs"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            />
          }
        >
          <ItemMedia variant="icon">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-3 in-data-open:rotate-90 text-muted-foreground transition-transform"
            />
            <FolderIcon
              aria-hidden="true"
              className="size-3.5 text-muted-foreground group-hover/item:text-foreground"
            />
          </ItemMedia>
          <ItemTitle className="text-sm">{item.name}</ItemTitle>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden pt-0.5 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-0.5 ps-1.5">
            {item.items.map((child) => (
              <TreeItem
                item={child}
                key={child.name}
                level={level + 1}
                onSelect={onSelect}
                selectedId={selectedId}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Item
      className="group/item cursor-pointer py-1.5 hover:bg-accent data-[active=true]:bg-accent"
      data-active={isSelected}
      onClick={() => onSelect?.(item.name)}
      style={{ paddingLeft: `${level * 12 + 9}px` }}
    >
      <ItemMedia variant="icon">
        <FileIcon
          aria-hidden="true"
          className="size-4 text-muted-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground"
        />
      </ItemMedia>
      <ItemTitle className="text-secondary-foreground text-sm group-hover/item:text-foreground group-data-[active=true]/item:text-foreground">
        {item.name}
      </ItemTitle>
      <ItemActions className="-mr-2 ml-auto gap-0 opacity-0 transition-opacity group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100">
        <Button size="icon-xs" variant="ghost">
          <DownloadIcon aria-hidden="true" />
        </Button>
        <Button size="icon-xs" variant="ghost">
          <TrashIcon aria-hidden="true" />
        </Button>
      </ItemActions>
    </Item>
  );
}

export function Pattern() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-64 w-72">
      <Card className="gap-1 p-1">
        <CardHeader className="p-0">
          <Tabs defaultValue="explorer">
            <TabsList className="h-8 w-full bg-accent p-1">
              <TabsTrigger className="text-xs" value="explorer">
                Explorer
              </TabsTrigger>
              <TabsTrigger className="text-xs" value="outline">
                Outline
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-0.5">
            {fileTree.map((item) => (
              <TreeItem
                item={item}
                key={item.name}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
