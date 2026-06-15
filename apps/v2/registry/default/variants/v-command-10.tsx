"use client";

import { HashIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";

type Tag = { color: string; id: string; label: string };

const tags: Tag[] = [
  { color: "bg-blue-500", id: "bug", label: "bug" },
  { color: "bg-green-500", id: "feature", label: "feature" },
  { color: "bg-yellow-500", id: "enhancement", label: "enhancement" },
  { color: "bg-purple-500", id: "docs", label: "docs" },
  { color: "bg-red-500", id: "breaking", label: "breaking" },
  { color: "bg-orange-500", id: "performance", label: "performance" },
  { color: "bg-teal-500", id: "security", label: "security" },
  { color: "bg-pink-500", id: "design", label: "design" },
];

const groups = [{ items: tags, label: "Labels", value: "labels" }];

export default function Component() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["bug", "feature"]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  const selectedTags = tags.filter((t) => selected.includes(t.id));

  return (
    <div className="flex flex-col items-start gap-3">
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger render={<Button size="sm" variant="outline" />}>
          <TagIcon className="size-3.5" />
          Apply labels
        </CommandDialogTrigger>
        <CommandDialogPopup>
          <Command items={groups}>
            <CommandInput placeholder="Search labels..." />
            <CommandPanel>
              <CommandEmpty>No labels found.</CommandEmpty>
              <CommandList>
                {(group: (typeof groups)[number]) => (
                  <CommandGroup items={group.items} key={group.value}>
                    <CommandGroupLabel>{group.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(tag: Tag) => (
                        <CommandItem
                          className="gap-2"
                          key={tag.id}
                          onSelect={() => toggle(tag.id)}
                          value={tag.id}
                        >
                          <span
                            className={`size-2.5 shrink-0 rounded-full ${tag.color}`}
                          />
                          <HashIcon className="size-3.5 text-muted-foreground" />
                          {tag.label}
                          {selected.includes(tag.id) && (
                            <span className="ml-auto text-muted-foreground text-xs">
                              ✓
                            </span>
                          )}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                )}
              </CommandList>
            </CommandPanel>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedTags.map((tag) => (
            <Badge className="gap-1.5 text-xs" key={tag.id} variant="outline">
              <span className={`size-2 rounded-full ${tag.color}`} />
              {tag.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
