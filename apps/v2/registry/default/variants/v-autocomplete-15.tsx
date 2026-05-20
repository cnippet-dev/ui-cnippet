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
    id: "1",
    label: "Alice Johnson",
    email: "alice@company.com",
    role: "Design",
    avatarColor: "#8b5cf6",
    initials: "AJ",
  },
  {
    id: "2",
    label: "Bob Chen",
    email: "bob@company.com",
    role: "Frontend",
    avatarColor: "#3b82f6",
    initials: "BC",
  },
  {
    id: "3",
    label: "Carol Davis",
    email: "carol@company.com",
    role: "Backend",
    avatarColor: "#10b981",
    initials: "CD",
  },
  {
    id: "4",
    label: "Dan Park",
    email: "dan@company.com",
    role: "DevOps",
    avatarColor: "#f97316",
    initials: "DP",
  },
  {
    id: "5",
    label: "Eva Martín",
    email: "eva@company.com",
    role: "Product",
    avatarColor: "#ec4899",
    initials: "EM",
  },
  {
    id: "6",
    label: "Frank Wright",
    email: "frank@company.com",
    role: "QA",
    avatarColor: "#eab308",
    initials: "FW",
  },
  {
    id: "7",
    label: "Grace Lee",
    email: "grace@company.com",
    role: "Mobile",
    avatarColor: "#06b6d4",
    initials: "GL",
  },
  {
    id: "8",
    label: "Hiro Tanaka",
    email: "hiro@company.com",
    role: "Data",
    avatarColor: "#ef4444",
    initials: "HT",
  },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label className="text-sm font-medium">Assign to</label>
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
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: member.avatarColor }}
                  >
                    {member.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium leading-tight">
                      {member.label}
                    </div>
                    <div className="truncate text-xs leading-tight text-muted-foreground">
                      {member.email}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
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
