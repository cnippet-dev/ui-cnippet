// title: Small tag filter with icon
"use client";

import { HashIcon } from "lucide-react";
import { useState } from "react";
import { TagInput } from "@/registry/default/ui/tag-input";

const POSTS = [
  { tags: ["release", "ui"], title: "Cnippet 2.4 is out" },
  { tags: ["guide", "forms"], title: "Validating forms without a library" },
  { tags: ["ui", "motion"], title: "Spring animations that don't feel bouncy" },
  { tags: ["guide", "ui"], title: "Building a command palette" },
];

export default function Particle() {
  const [filters, setFilters] = useState(["ui"]);
  const shown = POSTS.filter((p) => filters.every((f) => p.tags.includes(f)));

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <TagInput
        aria-label="Filter posts by tag"
        onValueChange={(next) => setFilters(next.map((t) => t.toLowerCase()))}
        placeholder="Filter by tag…"
        size="sm"
        startAddon={<HashIcon />}
        value={filters}
      />
      <ul className="divide-y rounded-lg border text-sm">
        {shown.length === 0 && (
          <li className="px-3 py-2 text-muted-foreground">
            No matching posts.
          </li>
        )}
        {shown.map((p) => (
          <li className="flex justify-between gap-3 px-3 py-2" key={p.title}>
            <span className="truncate">{p.title}</span>
            <span className="shrink-0 text-muted-foreground text-xs">
              {p.tags.map((t) => `#${t}`).join(" ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
