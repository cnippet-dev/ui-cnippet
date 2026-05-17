"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";

const users = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    email: "alex@example.com",
    name: "Alex Johnson",
    role: "Admin",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    email: "sarah@example.com",
    name: "Sarah Chen",
    role: "Editor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
    email: "david@example.com",
    name: "David Kim",
    role: "Viewer",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80",
    email: "emma@example.com",
    name: "Emma Wilson",
    role: "Admin",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    email: "michael@example.com",
    name: "Michael Rodriguez",
    role: "Editor",
  },
];

type User = (typeof users)[number];

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Search Users
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={users}>
          <CommandInput placeholder="Search by name or email..." />
          <CommandPanel>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandList>
              {(user: User) => (
                <CommandItem
                  className="gap-2 py-2"
                  key={user.email}
                  value={user.name}
                >
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage alt={user.name} src={user.avatar} />
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user.email}
                    </span>
                  </div>
                  <div className="ml-auto" data-slot="command-shortcut">
                    <Badge
                      size="sm"
                      variant={
                        user.role === "Admin"
                          ? "default"
                          : user.role === "Editor"
                            ? "info"
                            : "success"
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                </CommandItem>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
