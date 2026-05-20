"use client";

import { SendIcon, UserPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

type Role = "Admin" | "Editor" | "Viewer";
type Invite = { id: number; email: string; role: Role; initials: string };

const roles: Role[] = ["Admin", "Editor", "Viewer"];

const roleBadge: Record<Role, string> = {
  Admin: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  Editor:
    "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  Viewer: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const pending: Invite[] = [
  { email: "sarah@example.com", id: 1, initials: "SC", role: "Editor" },
  { email: "marcus@example.com", id: 2, initials: "MK", role: "Viewer" },
];

export function Pattern() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Editor");
  const [invites, setInvites] = useState<Invite[]>(pending);

  const send = () => {
    if (!email.trim()) return;
    const initials = email.slice(0, 2).toUpperCase();
    setInvites((prev) => [
      ...prev,
      { email: email.trim(), id: Date.now(), initials, role },
    ]);
    setEmail("");
  };

  const remove = (id: number) =>
    setInvites((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <UserPlusIcon aria-hidden="true" />
          Invite Members
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Invite Team Members</SheetTitle>
            <SheetDescription>
              Send invitations to collaborate on this project.
            </SheetDescription>
          </SheetHeader>
          <SheetPanel className="space-y-5">
            <div className="space-y-3">
              <Field>
                <FieldLabel>Email address</FieldLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="colleague@company.com"
                  type="email"
                  value={email}
                />
              </Field>
              <Field>
                <FieldLabel>Role</FieldLabel>
                <div className="flex gap-2">
                  {roles.map((r) => (
                    <button
                      className={`flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                        role === r
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      key={r}
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </Field>
              <Button className="w-full" onClick={send}>
                <SendIcon className="size-3.5" />
                Send Invitation
              </Button>
            </div>

            {invites.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
                  Pending ({invites.length})
                </p>
                <div className="space-y-2">
                  {invites.map((invite) => (
                    <div
                      className="flex items-center gap-3 rounded-lg border p-2.5"
                      key={invite.id}
                    >
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {invite.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{invite.email}</p>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 font-medium text-[10px] ${roleBadge[invite.role]}`}
                      >
                        {invite.role}
                      </span>
                      <Button
                        aria-label="Remove invite"
                        className="size-6"
                        onClick={() => remove(invite.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button>Done</Button>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
