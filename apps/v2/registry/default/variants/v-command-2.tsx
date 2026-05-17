"use client";

import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react";
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
  CommandShortcut,
} from "@/registry/default/ui/command";

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Simple Command
      </CommandDialogTrigger>
      <CommandDialogPopup className="max-w-xs">
        <Command>
          <CommandList>
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
