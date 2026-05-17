"use client";

import {
  BookOpenIcon,
  ClockIcon,
  LifeBuoyIcon,
  MessageSquareIcon,
  StarIcon,
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
} from "@/registry/default/ui/command";

type Item = {
  value: string;
  label: string;
  time?: string;
  icon: "star" | "clock" | "book" | "lifebuoy" | "message";
};

type Group = { value: string; label: string; items: Item[] };

const groups: Group[] = [
  {
    items: [
      { icon: "star", label: "Design System", value: "design-system" },
      { icon: "star", label: "API Documentation", value: "api-documentation" },
    ],
    label: "Starred",
    value: "starred",
  },
  {
    items: [
      {
        icon: "clock",
        label: "Dashboard Analytics",
        time: "2m ago",
        value: "dashboard-analytics",
      },
      {
        icon: "clock",
        label: "User Settings",
        time: "15m ago",
        value: "user-settings",
      },
      {
        icon: "clock",
        label: "Team Members",
        time: "1h ago",
        value: "team-members",
      },
      {
        icon: "clock",
        label: "Billing & Plans",
        time: "2h ago",
        value: "billing-plans",
      },
    ],
    label: "Recent",
    value: "recent",
  },
  {
    items: [
      { icon: "book", label: "Documentation", value: "documentation" },
      { icon: "lifebuoy", label: "Help & Support", value: "help-support" },
      { icon: "message", label: "Contact Us", value: "contact-us" },
    ],
    label: "Help",
    value: "help",
  },
];

const icons: Record<Item["icon"], React.ReactNode> = {
  book: <BookOpenIcon className="size-4 shrink-0" />,
  clock: <ClockIcon className="size-4 shrink-0 text-muted-foreground" />,
  lifebuoy: <LifeBuoyIcon className="size-4 shrink-0" />,
  message: <MessageSquareIcon className="size-4 shrink-0" />,
  star: <StarIcon className="size-4 shrink-0 text-yellow-500" />,
};

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Search Everything
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groups}>
          <CommandInput placeholder="Search or jump to..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
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
                          {item.time && (
                            <div
                              className="ml-auto"
                              data-slot="command-shortcut"
                            >
                              <span>{item.time}</span>
                            </div>
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
