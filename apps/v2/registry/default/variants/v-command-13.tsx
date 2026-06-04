"use client";

import {
  ArrowRightIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Fragment, useState } from "react";
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
  CommandSeparator,
  CommandShortcut,
} from "@/registry/default/ui/command";
import { Kbd } from "@/registry/default/ui/kbd";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  value: string;
};
type NavGroup = { items: NavItem[]; label: string; value: string };

const nav: NavGroup[] = [
  {
    items: [
      {
        icon: <LayoutDashboardIcon className="size-4" />,
        label: "Dashboard",
        shortcut: "G D",
        value: "dashboard",
      },
      {
        icon: <UsersIcon className="size-4" />,
        label: "Users",
        shortcut: "G U",
        value: "users",
      },
      {
        icon: <PackageIcon className="size-4" />,
        label: "Products",
        shortcut: "G P",
        value: "products",
      },
      {
        icon: <MessageSquareIcon className="size-4" />,
        label: "Messages",
        value: "messages",
      },
    ],
    label: "Navigation",
    value: "nav",
  },
  {
    items: [
      {
        icon: <SettingsIcon className="size-4" />,
        label: "Settings",
        shortcut: "G S",
        value: "settings",
      },
      {
        icon: <GlobeIcon className="size-4" />,
        label: "Domains",
        value: "domains",
      },
    ],
    label: "Admin",
    value: "admin",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Go to page...
        <Kbd>G</Kbd>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={nav}>
          <CommandInput placeholder="Go to..." />
          <CommandPanel>
            <CommandEmpty>Page not found.</CommandEmpty>
            <CommandList>
              {(group: NavGroup, i: number) => (
                <Fragment key={group.value}>
                  {i > 0 && <CommandSeparator />}
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: NavItem) => (
                        <CommandItem
                          className="gap-2"
                          key={item.value}
                          onSelect={() => setOpen(false)}
                          value={item.value}
                        >
                          {item.icon}
                          <span className="flex-1">{item.label}</span>
                          {item.shortcut ? (
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          ) : (
                            <ArrowRightIcon className="size-3.5 text-muted-foreground" />
                          )}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
