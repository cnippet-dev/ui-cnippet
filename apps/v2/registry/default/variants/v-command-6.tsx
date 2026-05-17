"use client";

import {
  FileTextIcon,
  HouseIcon,
  InboxIcon,
  LogOutIcon,
  MoonIcon,
  PlusIcon,
  UserPlusIcon,
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

type Item = {
  value: string;
  label: string;
  shortcut: string;
  icon:
    | "plus"
    | "file-text"
    | "user-plus"
    | "house"
    | "inbox"
    | "moon"
    | "log-out";
};

type Group = { value: string; label: string; items: Item[] };

const groups: Group[] = [
  {
    items: [
      {
        icon: "plus",
        label: "New Project",
        shortcut: "⌘N",
        value: "new-project",
      },
      {
        icon: "file-text",
        label: "New Document",
        shortcut: "⌘⇧N",
        value: "new-document",
      },
      {
        icon: "user-plus",
        label: "Invite Member",
        shortcut: "⌘I",
        value: "invite-member",
      },
    ],
    label: "Create",
    value: "create",
  },
  {
    items: [
      {
        icon: "house",
        label: "Go to Dashboard",
        shortcut: "⌘D",
        value: "go-to-dashboard",
      },
      {
        icon: "inbox",
        label: "Go to Inbox",
        shortcut: "⌘⇧I",
        value: "go-to-inbox",
      },
    ],
    label: "Navigate",
    value: "navigate",
  },
  {
    items: [
      {
        icon: "moon",
        label: "Toggle Dark Mode",
        shortcut: "⌘⇧D",
        value: "toggle-dark-mode",
      },
      { icon: "log-out", label: "Sign Out", shortcut: "⌘Q", value: "sign-out" },
    ],
    label: "Settings",
    value: "settings",
  },
];

const icons: Record<Item["icon"], React.ReactNode> = {
  "file-text": <FileTextIcon className="size-4 shrink-0" />,
  house: <HouseIcon className="size-4 shrink-0" />,
  inbox: <InboxIcon className="size-4 shrink-0" />,
  "log-out": <LogOutIcon className="size-4 shrink-0" />,
  moon: <MoonIcon className="size-4 shrink-0" />,
  plus: <PlusIcon className="size-4 shrink-0" />,
  "user-plus": <UserPlusIcon className="size-4 shrink-0" />,
};

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Quick Actions
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groups}>
          <CommandInput placeholder="What do you need?" />
          <CommandPanel>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandList>
              {(group: Group, index: number) => (
                <Fragment key={group.value}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => (
                        <CommandItem
                          className="gap-2"
                          key={item.value}
                          value={item.value}
                        >
                          {icons[item.icon]}
                          <span>{item.label}</span>
                          <CommandShortcut>{item.shortcut}</CommandShortcut>
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
