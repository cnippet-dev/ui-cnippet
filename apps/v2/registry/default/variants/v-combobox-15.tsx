"use client";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/default/ui/combobox";

interface TeamMember {
  label: string;
  value: string;
  role: string;
  initials: string;
  color: string;
}

const members: TeamMember[] = [
  {
    color: "bg-violet-500",
    initials: "AJ",
    label: "Alice Johnson",
    role: "Engineering Lead",
    value: "alice",
  },
  {
    color: "bg-blue-500",
    initials: "BM",
    label: "Bob Martinez",
    role: "Senior Frontend",
    value: "bob",
  },
  {
    color: "bg-pink-500",
    initials: "CW",
    label: "Carol White",
    role: "Product Designer",
    value: "carol",
  },
  {
    color: "bg-amber-500",
    initials: "DK",
    label: "David Kim",
    role: "Backend Engineer",
    value: "david",
  },
  {
    color: "bg-emerald-500",
    initials: "EC",
    label: "Eva Chen",
    role: "DevOps Engineer",
    value: "eva",
  },
  {
    color: "bg-red-500",
    initials: "FL",
    label: "Frank Lee",
    role: "QA Engineer",
    value: "frank",
  },
  {
    color: "bg-cyan-500",
    initials: "GP",
    label: "Grace Park",
    role: "Data Scientist",
    value: "grace",
  },
  {
    color: "bg-orange-500",
    initials: "HB",
    label: "Henry Brown",
    role: "Security Engineer",
    value: "henry",
  },
];

export default function Particle() {
  return (
    <Combobox items={members}>
      <ComboboxInput aria-label="Assign to" placeholder="Assign to..." />
      <ComboboxPopup>
        <ComboboxEmpty>No team members found.</ComboboxEmpty>
        <ComboboxList>
          {(member: TeamMember) => (
            <ComboboxItem
              className="**:data-check:ms-auto"
              key={member.value}
              value={member}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full font-semibold text-white text-xs ${member.color}`}
                >
                  {member.initials}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{member.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {member.role}
                  </span>
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
