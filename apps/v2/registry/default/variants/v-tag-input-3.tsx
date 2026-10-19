// title: Repository topics with a limit and counter
"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { TagInput } from "@/registry/default/ui/tag-input";

const MAX = 5;

export default function Particle() {
  const [topics, setTopics] = useState(["design", "frontend", "react"]);
  const full = topics.length >= MAX;

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor="repo-topics">Topics</Label>
        <span
          className={
            full
              ? "text-warning-foreground text-xs tabular-nums"
              : "text-muted-foreground text-xs tabular-nums"
          }
        >
          {topics.length}/{MAX}
        </span>
      </div>
      <TagInput
        id="repo-topics"
        max={MAX}
        onValueChange={(next) =>
          setTopics(next.map((t) => t.toLowerCase().replace(/\s+/g, "-")))
        }
        placeholder={full ? undefined : "Add a topic"}
        readOnly={full}
        value={topics}
      />
      <p className="text-muted-foreground text-xs">
        {full
          ? "That's the limit. Remove a topic to add another."
          : "Topics are lowercase; spaces become hyphens."}
      </p>
    </div>
  );
}
