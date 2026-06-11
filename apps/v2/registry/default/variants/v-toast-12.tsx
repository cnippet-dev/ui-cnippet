"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

const members = [
  {
    email: "olivia@example.com",
    id: "olivia",
    initials: "OM",
    name: "Olivia Martin",
    role: "Editor",
  },
  {
    email: "jackson@example.com",
    id: "jackson",
    initials: "JL",
    name: "Jackson Lee",
    role: "Viewer",
  },
  {
    email: "isabella@example.com",
    id: "isabella",
    initials: "IN",
    name: "Isabella Nguyen",
    role: "Editor",
  },
];

export function Pattern() {
  const [invited, setInvited] = useState<Set<string>>(new Set());

  const invite = (member: (typeof members)[0]) => {
    setInvited((prev) => new Set(prev).add(member.id));
    const id = toastManager.add({
      actionProps: {
        children: "Undo",
        onClick: () => {
          toastManager.close(id);
          setInvited((prev) => {
            const next = new Set(prev);
            next.delete(member.id);
            return next;
          });
          toastManager.add({
            description: `${member.name}'s invite has been revoked.`,
            title: "Invite revoked",
            type: "info",
          });
        },
      },
      description: `${member.email} will receive an email invite.`,
      timeout: 6000,
      title: `Invite sent to ${member.name}`,
      type: "success",
    });
  };

  return (
    <div className="w-full max-w-xs rounded-xl border border-border p-4">
      <p className="mb-3 font-semibold text-sm">Invite team members</p>
      <div className="flex flex-col gap-2">
        {members.map((m) => (
          <div className="flex items-center justify-between gap-2" key={m.id}>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-muted font-medium text-xs">
                {m.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm leading-none">
                  {m.name}
                </span>
                <span className="text-muted-foreground text-xs">{m.role}</span>
              </div>
            </div>
            <Button
              disabled={invited.has(m.id)}
              onClick={() => invite(m)}
              size="sm"
              variant="outline"
            >
              {invited.has(m.id) ? "Invited" : "Invite"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
