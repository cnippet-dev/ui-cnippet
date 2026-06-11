"use client";

import { ChevronDownIcon, UserIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

type Member = {
  id: string;
  name: string;
  role: string;
  status: "active" | "away" | "offline";
};

const TEAMS: { id: string; label: string; members: Member[] }[] = [
  {
    id: "design",
    label: "Design",
    members: [
      { id: "m1", name: "Aria Chen", role: "Lead Designer", status: "active" },
      { id: "m2", name: "Leo Park", role: "Product Designer", status: "away" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    members: [
      { id: "m3", name: "Kai Nguyen", role: "Tech Lead", status: "active" },
      { id: "m4", name: "Sam Rivera", role: "Frontend", status: "active" },
      { id: "m5", name: "Mia Johansson", role: "Backend", status: "offline" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    members: [
      { id: "m6", name: "James Okafor", role: "Growth", status: "active" },
      { id: "m7", name: "Priya Singh", role: "Content", status: "away" },
    ],
  },
];

const statusDot: Record<string, string> = {
  active: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground/40",
};

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-1">
      <p className="mb-3 font-semibold text-sm">Team directory</p>
      {TEAMS.map((team) => (
        <Collapsible defaultOpen key={team.id}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-2 font-medium text-sm transition-colors hover:bg-muted/50">
            <span className="flex items-center gap-2">
              <UserIcon className="size-3.5 text-muted-foreground" />
              {team.label}
              <Badge size="sm" variant="secondary">
                {team.members.length}
              </Badge>
            </span>
            <ChevronDownIcon className="size-3.5 in-data-panel-open:rotate-180 text-muted-foreground transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="ml-5 space-y-0.5 border-l pb-1 pl-3">
              {team.members.map((m) => (
                <div
                  className="flex items-center gap-2 rounded-md px-2 py-1.5"
                  key={m.id}
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${statusDot[m.status]}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-none">{m.name}</p>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {m.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>
        </Collapsible>
      ))}
    </div>
  );
}
