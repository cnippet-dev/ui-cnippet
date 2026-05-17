"use client";

import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/default/ui/command";

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open Command
      </CommandDialogTrigger>
      <CommandDialogPopup className="max-w-sm">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem className="gap-2">
                <CalendarIcon className="size-4 shrink-0" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem className="gap-2">
                <SmileIcon className="size-4 shrink-0" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem className="gap-2">
                <CalculatorIcon className="size-4 shrink-0" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem className="gap-2">
                <UserIcon className="size-4 shrink-0" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem className="gap-2">
                <CreditCardIcon className="size-4 shrink-0" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem className="gap-2">
                <SettingsIcon className="size-4 shrink-0" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
