"use client";

import { FolderIcon, StarIcon } from "lucide-react";
import { useState } from "react";
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

type Project = { id: string; label: string; starred: boolean };

const projects: Project[] = [
  { id: "design-system", label: "Design System", starred: true },
  { id: "api-gateway", label: "API Gateway", starred: false },
  { id: "mobile-app", label: "Mobile App", starred: true },
  { id: "marketing-site", label: "Marketing Site", starred: false },
  { id: "analytics-dashboard", label: "Analytics Dashboard", starred: false },
  { id: "internal-tools", label: "Internal Tools", starred: false },
];

const groups = [{ items: projects, label: "All Projects", value: "all" }];

export default function Component() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("design-system");

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        <FolderIcon className="size-4" />
        Switch project
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groups}>
          <CommandInput placeholder="Search projects..." />
          <CommandPanel>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandList>
              {(group: (typeof groups)[number]) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.label}</CommandGroupLabel>
                  <CommandCollection>
                    {(project: Project) => (
                      <CommandItem
                        className="gap-2"
                        key={project.id}
                        onSelect={() => {
                          setActive(project.id);
                          setOpen(false);
                        }}
                        value={project.id}
                      >
                        {project.starred ? (
                          <StarIcon className="size-4 text-yellow-500" />
                        ) : (
                          <FolderIcon className="size-4 text-muted-foreground" />
                        )}
                        <span className="flex-1">{project.label}</span>
                        {active === project.id && (
                          <span className="text-muted-foreground text-xs">
                            Current
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
  );
}
