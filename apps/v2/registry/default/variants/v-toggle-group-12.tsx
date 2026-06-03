// biome-ignore-all lint/style/noNonNullAssertion:<>

"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

type Priority = "low" | "medium" | "high" | "critical";

const priorities: {
  color: string;
  dot: string;
  id: Priority;
  label: string;
}[] = [
  {
    color: "text-muted-foreground",
    dot: "bg-muted-foreground/60",
    id: "low",
    label: "Low",
  },
  { color: "text-blue-500", dot: "bg-blue-500", id: "medium", label: "Medium" },
  { color: "text-amber-500", dot: "bg-amber-500", id: "high", label: "High" },
  {
    color: "text-red-500",
    dot: "bg-red-500",
    id: "critical",
    label: "Critical",
  },
];

const issues = [
  { id: "ISS-101", title: "Login page unresponsive on mobile" },
  { id: "ISS-102", title: "Dashboard charts not loading" },
  { id: "ISS-103", title: "Typo in onboarding copy" },
];

export function Pattern() {
  const [issuePriorities, setIssuePriorities] = useState<
    Record<string, Priority>
  >({
    "ISS-101": "critical",
    "ISS-102": "high",
    "ISS-103": "low",
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {issues.map((issue) => {
        const current = issuePriorities[issue.id] ?? "low";
        const p = priorities.find((x) => x.id === current)!;
        return (
          <div
            className="flex flex-col gap-2 rounded-lg border border-border p-3"
            key={issue.id}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-muted-foreground text-xs">
                {issue.id}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${p.dot}`} />
                <span className={`font-medium text-xs ${p.color}`}>
                  {p.label}
                </span>
              </div>
            </div>
            <p className="text-sm leading-snug">{issue.title}</p>
            <ToggleGroup
              className="justify-start"
              onValueChange={(v) => {
                if (v[0])
                  setIssuePriorities((prev) => ({
                    ...prev,
                    [issue.id]: v[0] as Priority,
                  }));
              }}
              size="sm"
              value={[current]}
              variant="outline"
            >
              {priorities.map((pri) => (
                <ToggleGroupItem
                  aria-label={`Set ${pri.label} priority`}
                  className={`gap-1 text-xs ${issuePriorities[issue.id] === pri.id ? pri.color : ""}`}
                  key={pri.id}
                  value={pri.id}
                >
                  <span className={`size-1.5 rounded-full ${pri.dot}`} />
                  {pri.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        );
      })}
    </div>
  );
}
