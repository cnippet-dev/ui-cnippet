"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  HashIcon,
  LayoutDashboardIcon,
  SearchIcon,
  UserCircleIcon,
} from "lucide-react";
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
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

type Page = {
  badge?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
};

const pages: Page[] = [
  {
    badge: "12",
    icon: <LayoutDashboardIcon className="size-4" />,
    label: "Dashboard",
    value: "dashboard",
  },
  {
    icon: <UserCircleIcon className="size-4" />,
    label: "Profile",
    value: "profile",
  },
  {
    badge: "3",
    icon: <HashIcon className="size-4" />,
    label: "Channels",
    value: "channels",
  },
  { icon: <SearchIcon className="size-4" />, label: "Search", value: "search" },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Quick open
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={[{ items: pages, label: "Pages", value: "pages" }]}>
          <CommandInput placeholder="Search pages and actions..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: { items: Page[]; label: string; value: string }) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.label}</CommandGroupLabel>
                  <CommandCollection>
                    {(page: Page) => (
                      <CommandItem
                        className="gap-2"
                        key={page.value}
                        onSelect={() => setOpen(false)}
                        value={page.value}
                      >
                        {page.icon}
                        <span className="flex-1">{page.label}</span>
                        {page.badge && (
                          <Badge size="sm" variant="secondary">
                            {page.badge}
                          </Badge>
                        )}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-3">
              <KbdGroup>
                <Kbd>
                  <ArrowUpIcon />
                </Kbd>
                <Kbd>
                  <ArrowDownIcon />
                </Kbd>
              </KbdGroup>
              <span>navigate</span>
              <Kbd>
                <CornerDownLeftIcon />
              </Kbd>
              <span>open</span>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
