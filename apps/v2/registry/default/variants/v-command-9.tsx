"use client";

import { CheckIcon, MailIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
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

type Member = { email: string; id: string; initials: string; name: string };

const members: Member[] = [
  { email: "alex@company.com", id: "alex", initials: "AL", name: "Alex Lee" },
  { email: "sara@company.com", id: "sara", initials: "SR", name: "Sara Ruiz" },
  {
    email: "james@company.com",
    id: "james",
    initials: "JB",
    name: "James Baker",
  },
  { email: "nina@company.com", id: "nina", initials: "NK", name: "Nina Kim" },
  { email: "omar@company.com", id: "omar", initials: "OA", name: "Omar Adil" },
];

const groups = [{ items: members, label: "Teammates", value: "teammates" }];

export default function Component() {
  const [open, setOpen] = useState(false);
  const [invited, setInvited] = useState<string[]>([]);

  function toggle(id: string) {
    setInvited((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        <UserPlusIcon className="size-4" />
        Invite members
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groups}>
          <CommandInput placeholder="Search by name or email..." />
          <CommandPanel>
            <CommandEmpty>No teammates found.</CommandEmpty>
            <CommandList>
              {(group: (typeof groups)[number]) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.label}</CommandGroupLabel>
                  <CommandCollection>
                    {(member: Member) => (
                      <CommandItem
                        className="gap-2"
                        key={member.id}
                        onSelect={() => toggle(member.id)}
                        value={member.id}
                      >
                        <Avatar className="size-6">
                          <AvatarFallback className="text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                          <span className="text-sm">{member.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {member.email}
                          </span>
                        </div>
                        {invited.includes(member.id) && (
                          <CheckIcon className="ml-auto size-4 text-primary" />
                        )}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
        {invited.length > 0 && (
          <div className="flex items-center justify-between border-t px-3 py-2">
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <MailIcon className="size-3.5" />
              {invited.length} invite{invited.length > 1 ? "s" : ""} pending
            </span>
            <Button
              onClick={() => {
                setInvited([]);
                setOpen(false);
              }}
              size="sm"
            >
              Send invites
            </Button>
          </div>
        )}
      </CommandDialogPopup>
    </CommandDialog>
  );
}
