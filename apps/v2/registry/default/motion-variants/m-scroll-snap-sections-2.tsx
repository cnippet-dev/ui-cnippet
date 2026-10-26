"use client";

import { BellIcon, FolderIcon, UsersIcon } from "lucide-react";
import { ScrollSnapSections } from "@/registry/default/motion/scroll-snap-sections";

const slides = [
  {
    icon: FolderIcon,
    id: "onb-projects",
    text: "Keep every file and task in one place.",
    title: "Projects",
  },
  {
    icon: UsersIcon,
    id: "onb-team",
    text: "Invite your team and assign work in a click.",
    title: "Teamwork",
  },
  {
    icon: BellIcon,
    id: "onb-alerts",
    text: "Only get notified about what matters to you.",
    title: "Focus",
  },
];

export default function ScrollSnapSectionsOnboarding() {
  return (
    <div className="flex justify-center py-4">
      <ScrollSnapSections
        className="h-96 w-72 overflow-hidden rounded-3xl border"
        direction="horizontal"
        sections={slides.map(({ icon: Icon, ...s }) => ({
          content: (
            <div className="flex flex-col items-center px-8 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                <Icon className="size-7 text-foreground" />
              </span>
              <h3 className="mt-6 font-semibold text-foreground text-xl">
                {s.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">{s.text}</p>
            </div>
          ),
          id: s.id,
          label: s.title,
        }))}
      />
    </div>
  );
}
