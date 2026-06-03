"use client";

import {
  BarChart2Icon,
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
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
  CommandSeparator,
} from "@/registry/default/ui/command";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

type Action = { icon: React.ReactNode; label: string; value: string };
type Section = { items: Action[]; label: string; value: string };

const sections: Section[] = [
  {
    items: [
      {
        icon: <UserIcon className="size-4" />,
        label: "Edit profile",
        value: "profile",
      },
      {
        icon: <BellIcon className="size-4" />,
        label: "Notifications",
        value: "notifications",
      },
      {
        icon: <CreditCardIcon className="size-4" />,
        label: "Billing",
        value: "billing",
      },
      {
        icon: <KeyIcon className="size-4" />,
        label: "API keys",
        value: "api-keys",
      },
    ],
    label: "Account",
    value: "account",
  },
  {
    items: [
      {
        icon: <SunIcon className="size-4" />,
        label: "Light mode",
        value: "light",
      },
      {
        icon: <MoonIcon className="size-4" />,
        label: "Dark mode",
        value: "dark",
      },
      {
        icon: <BarChart2Icon className="size-4" />,
        label: "Analytics",
        value: "analytics",
      },
    ],
    label: "Preferences",
    value: "prefs",
  },
  {
    items: [
      {
        icon: <LogOutIcon className="size-4 text-destructive" />,
        label: "Sign out",
        value: "signout",
      },
    ],
    label: "Session",
    value: "session",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Account settings
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={sections}>
          <CommandInput placeholder="Search settings..." />
          <CommandPanel>
            <CommandEmpty>No settings found.</CommandEmpty>
            <CommandList>
              {(section: Section, i: number) => (
                <>
                  {i > 0 && <CommandSeparator key={`sep-${section.value}`} />}
                  <CommandGroup items={section.items} key={section.value}>
                    <CommandGroupLabel>{section.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(action: Action) => (
                        <CommandItem
                          className="gap-2"
                          key={action.value}
                          onSelect={() => setOpen(false)}
                          value={action.value}
                        >
                          {action.icon}
                          {action.label}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
