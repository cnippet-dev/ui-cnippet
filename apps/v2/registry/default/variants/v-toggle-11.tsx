"use client";

import { BookmarkIcon } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

const articles = [
  {
    author: "Olivia Martin",
    id: "1",
    title: "Building scalable design systems with Base UI",
  },
  {
    author: "Jackson Lee",
    id: "2",
    title: "Tailwind CSS v4 migration guide",
  },
  {
    author: "Isabella Nguyen",
    id: "3",
    title: "Accessible React components from scratch",
  },
];

export function Pattern() {
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="w-full max-w-sm space-y-2">
      {articles.map((a) => {
        const isBookmarked = saved.has(a.id);
        return (
          <div
            className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5"
            key={a.id}
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-medium text-sm">{a.title}</span>
              <span className="text-muted-foreground text-xs">{a.author}</span>
            </div>
            <Toggle
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
              className="shrink-0"
              onPressedChange={() => toggle(a.id)}
              pressed={isBookmarked}
              size="sm"
              variant="outline"
            >
              <BookmarkIcon
                className={`size-4 transition-colors ${isBookmarked ? "fill-current" : ""}`}
              />
            </Toggle>
          </div>
        );
      })}
      <p className="text-center text-muted-foreground text-xs">
        {saved.size} of {articles.length} saved
      </p>
    </div>
  );
}
