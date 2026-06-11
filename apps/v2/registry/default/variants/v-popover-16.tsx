"use client";

import { SmileIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "🎉",
  "🔥",
  "👏",
  "🙌",
  "💡",
  "✅",
  "⭐",
  "🚀",
  "💯",
  "🤔",
  "👀",
  "💪",
  "🌟",
  "😊",
  "🎯",
  "💎",
  "🦄",
];

export function Pattern() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger
          aria-label="Add reaction"
          render={<Button size="icon" variant="outline" />}
        >
          <SmileIcon aria-hidden="true" className="size-4" />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="grid grid-cols-5 gap-0.5">
            {EMOJIS.map((emoji) => (
              <button
                aria-label={`React with ${emoji}`}
                className="flex size-8 items-center justify-center rounded text-lg transition-colors hover:bg-muted"
                key={emoji}
                onClick={() => setSelected(emoji)}
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {selected && (
        <div className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm">
          <span>{selected}</span>
          <span className="text-muted-foreground text-xs">1</span>
        </div>
      )}
    </div>
  );
}
