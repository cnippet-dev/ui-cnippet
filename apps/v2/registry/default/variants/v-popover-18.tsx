"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const SUGGESTIONS = ["design", "engineering", "product", "research", "growth"];

export function Pattern() {
  const [tags, setTags] = useState(["react", "typescript"]);
  const [input, setInput] = useState("");

  function addTag(tag: string) {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) setTags((p) => [...p, trimmed]);
    setInput("");
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((tag) => (
        <Badge className="gap-1 pr-1" key={tag} variant="secondary">
          {tag}
          <button
            aria-label={`Remove ${tag}`}
            className="rounded-full hover:bg-foreground/10"
            onClick={() => setTags((p) => p.filter((t) => t !== tag))}
            type="button"
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      <Popover>
        <PopoverTrigger
          aria-label="Add tag"
          render={<Button className="size-6" size="icon" variant="ghost" />}
        >
          <PlusIcon className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent className="w-52 gap-2" side="bottom">
          <Input
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(input);
              }
            }}
            placeholder="Add tag…"
            value={input}
          />
          <div className="space-y-0.5">
            {SUGGESTIONS.filter((s) => !tags.includes(s))
              .slice(0, 3)
              .map((s) => (
                <button
                  className="flex w-full items-center rounded px-2 py-1 text-sm hover:bg-muted"
                  key={s}
                  onClick={() => addTag(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
