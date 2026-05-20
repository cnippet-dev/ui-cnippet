"use client";

import { User } from "lucide-react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

type TeamMember = {
  id: string;
  label: string;
  email: string;
  role: string;
  avatarColor: string;
  initials: string;
};

const teamMembers: TeamMember[] = [
  {
    avatarColor: "#8b5cf6",
    email: "alice@company.com",
    id: "1",
    initials: "AJ",
    label: "Alice Johnson",
    role: "Design",
  },
  {
    avatarColor: "#3b82f6",
    email: "bob@company.com",
    id: "2",
    initials: "BC",
    label: "Bob Chen",
    role: "Frontend",
  },
  {
    avatarColor: "#10b981",
    email: "carol@company.com",
    id: "3",
    initials: "CD",
    label: "Carol Davis",
    role: "Backend",
  },
  {
    avatarColor: "#f97316",
    email: "dan@company.com",
    id: "4",
    initials: "DP",
    label: "Dan Park",
    role: "DevOps",
  },
  {
    avatarColor: "#ec4899",
    email: "eva@company.com",
    id: "5",
    initials: "EM",
    label: "Eva Martín",
    role: "Product",
  },
  {
    avatarColor: "#eab308",
    email: "frank@company.com",
    id: "6",
    initials: "FW",
    label: "Frank Wright",
    role: "QA",
  },
  {
    avatarColor: "#06b6d4",
    email: "grace@company.com",
    id: "7",
    initials: "GL",
    label: "Grace Lee",
    role: "Mobile",
  },
  {
    avatarColor: "#ef4444",
    email: "hiro@company.com",
    id: "8",
    initials: "HT",
    label: "Hiro Tanaka",
    role: "Data",
  },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label className="font-medium text-sm">Assign to</label>
      <Autocomplete items={teamMembers}>
        <AutocompleteInput
          placeholder="Search team members…"
          showClear
          showTrigger
          startAddon={<User className="size-4 text-muted-foreground" />}
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No team members found.</AutocompleteEmpty>
          <AutocompleteList>
            {(member: TeamMember) => (
              <AutocompleteItem key={member.id} value={member}>
                <div className="flex w-full items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full font-semibold text-white text-xs"
                    style={{ backgroundColor: member.avatarColor }}
                  >
                    {member.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-sm leading-tight">
                      {member.label}
                    </div>
                    <div className="truncate text-muted-foreground text-xs leading-tight">
                      {member.email}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border px-2 py-0.5 text-muted-foreground text-xs">
                    {member.role}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
