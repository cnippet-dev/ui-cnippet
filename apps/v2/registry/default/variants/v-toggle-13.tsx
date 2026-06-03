"use client";

import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  Share2Icon,
} from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

const initialCounts = { hearts: 142, replies: 24, reposts: 38 };

export function Pattern() {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <div className="w-full max-w-xs rounded-xl border border-border p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-full bg-muted font-medium text-xs">
          JL
        </div>
        <div>
          <p className="font-medium text-sm leading-none">Jackson Lee</p>
          <p className="text-muted-foreground text-xs">@jacksonlee · 2h</p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-relaxed">
        Just shipped the new component library update. 15 new variants, dark
        mode support, and zero breaking changes. 🚀
      </p>
      <div className="flex items-center gap-1">
        <Toggle
          aria-label="Reply"
          className="gap-1.5 text-muted-foreground"
          size="sm"
        >
          <MessageCircleIcon className="size-4" />
          <span className="text-xs tabular-nums">{initialCounts.replies}</span>
        </Toggle>

        <Toggle
          aria-label={reposted ? "Undo repost" : "Repost"}
          className={`gap-1.5 transition-colors ${reposted ? "text-emerald-500" : "text-muted-foreground"}`}
          onPressedChange={setReposted}
          pressed={reposted}
          size="sm"
        >
          <RepeatIcon className="size-4" />
          <span className="text-xs tabular-nums">
            {initialCounts.reposts + (reposted ? 1 : 0)}
          </span>
        </Toggle>

        <Toggle
          aria-label={liked ? "Unlike" : "Like"}
          className={`gap-1.5 transition-colors ${liked ? "text-rose-500" : "text-muted-foreground"}`}
          onPressedChange={setLiked}
          pressed={liked}
          size="sm"
        >
          <HeartIcon
            className={`size-4 transition-colors ${liked ? "fill-rose-500" : ""}`}
          />
          <span className="text-xs tabular-nums">
            {initialCounts.hearts + (liked ? 1 : 0)}
          </span>
        </Toggle>

        <Toggle
          aria-label="Share"
          className="ml-auto text-muted-foreground"
          size="sm"
        >
          <Share2Icon className="size-4" />
        </Toggle>
      </div>
    </div>
  );
}
