"use client";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

export default function Particle() {
  const [votes, setVotes] = useState({ down: 4, up: 42 });
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const vote = (dir: "up" | "down") => {
    setVotes((v) => {
      if (voted === dir) return { ...v, [dir]: v[dir] - 1 };
      const next = { ...v, [dir]: v[dir] + 1 };
      if (voted) next[voted] = v[voted] - 1;
      return next;
    });
    setVoted((prev) => (prev === dir ? null : dir));
  };

  return (
    <Group aria-label="Helpfulness vote">
      <Button
        aria-label="Helpful"
        aria-pressed={voted === "up"}
        onClick={() => vote("up")}
        variant={voted === "up" ? "secondary" : "outline"}
      >
        <ThumbsUpIcon aria-hidden="true" />
        Helpful
        <Badge className="-me-1" variant="secondary">
          {votes.up}
        </Badge>
      </Button>
      <GroupSeparator />
      <Button
        aria-label="Not helpful"
        aria-pressed={voted === "down"}
        onClick={() => vote("down")}
        variant={voted === "down" ? "secondary" : "outline"}
      >
        <ThumbsDownIcon aria-hidden="true" />
        Not helpful
        <Badge className="-me-1" variant="secondary">
          {votes.down}
        </Badge>
      </Button>
    </Group>
  );
}
