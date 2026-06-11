"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const candidates = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    initials: "AJ",
    name: "Alex Johnson",
    role: "Frontend",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    initials: "SC",
    name: "Sarah Chen",
    role: "Backend",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
    initials: "MR",
    name: "Marcus Reed",
    role: "DevOps",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    initials: "LP",
    name: "Laura Park",
    role: "Design",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
    initials: "TK",
    name: "Tom Kim",
    role: "QA",
  },
];

export function Pattern() {
  const [selected, setSelected] = useState<string[]>(["AJ"]);

  const toggle = (initials: string) =>
    setSelected((prev) =>
      prev.includes(initials)
        ? prev.filter((i) => i !== initials)
        : [...prev, initials],
    );

  return (
    <div className="mx-auto w-full max-w-sm">
      <Frame>
        <FramePanel>
          <p className="mb-3 font-medium text-sm">Assign to</p>
          <div className="flex flex-col gap-2">
            {candidates.map((c) => {
              const isSelected = selected.includes(c.initials);
              return (
                <button
                  className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors hover:bg-accent ${
                    isSelected
                      ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                      : "bg-transparent"
                  }`}
                  key={c.initials}
                  onClick={() => toggle(c.initials)}
                  type="button"
                >
                  <Avatar className="size-7">
                    <AvatarImage alt={c.name} src={c.avatar} />
                    <AvatarFallback className="text-xs">
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {c.role}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckIcon className="size-4 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </FramePanel>
      </Frame>
    </div>
  );
}
