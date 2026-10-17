"use client";

import { MailIcon, ShieldIcon, UserIcon, UserMinusIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";

const MEMBERS = [
  {
    email: "alice@acme.dev",
    id: "u1",
    initials: "AP",
    name: "Alice Park",
    role: "Admin",
  },
  {
    email: "ben@acme.dev",
    id: "u2",
    initials: "BT",
    name: "Ben Torres",
    role: "Member",
  },
  {
    email: "celia@acme.dev",
    id: "u3",
    initials: "CK",
    name: "Celia Kim",
    role: "Member",
  },
  {
    email: "dan@acme.dev",
    id: "u4",
    initials: "DM",
    name: "Dan Moss",
    role: "Viewer",
  },
];

export function Pattern() {
  const [members, setMembers] = useState(MEMBERS);

  const setRole = (id: string, role: string) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  const remove = (id: string) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Manage team
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team members</DialogTitle>
          <DialogDescription>
            <span className="pointer-fine:inline hidden">
              Right-click a member to change their role or remove them.
            </span>
            <span className="pointer-coarse:inline hidden">
              Long-press a member to change their role or remove them.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-1">
          {members.map((member) => (
            <ContextMenu key={member.id}>
              <ContextMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 data-popup-open:bg-muted">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{member.name}</p>
                  <p className="truncate text-muted-foreground text-xs">
                    {member.email}
                  </p>
                </div>
                <Badge variant="outline">{member.role}</Badge>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuGroup>
                  <ContextMenuItem>
                    <UserIcon />
                    View profile
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <MailIcon />
                    Copy email
                  </ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <ShieldIcon />
                      Change role
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-36">
                      <ContextMenuRadioGroup
                        onValueChange={(role) => setRole(member.id, role)}
                        value={member.role}
                      >
                        <ContextMenuRadioItem value="Admin">
                          Admin
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="Member">
                          Member
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="Viewer">
                          Viewer
                        </ContextMenuRadioItem>
                      </ContextMenuRadioGroup>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem
                    onClick={() => remove(member.id)}
                    variant="destructive"
                  >
                    <UserMinusIcon />
                    Remove from team
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </DialogPanel>
      </DialogContent>
    </Dialog>
  );
}
