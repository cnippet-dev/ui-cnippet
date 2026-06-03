"use client";

import {
  ArrowUpIcon,
  FlagIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UserXIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const POSTS = [
  {
    author: "Luna V.",
    body: "Just shipped a redesign of our onboarding flow. Cut drop-off by 34% in the first week. The key was reducing the number of steps from 7 to 3.",
    id: "p1",
    time: "2h",
  },
  {
    author: "Rafi A.",
    body: "Hot take: dark mode is not an accessibility feature — it's a preference. True accessibility is about contrast ratios and text size, not color scheme.",
    id: "p2",
    time: "5h",
  },
];

export function Pattern() {
  const [votes, setVotes] = useState<Record<string, number>>({
    p1: 24,
    p2: 11,
  });

  return (
    <div className="w-full max-w-sm space-y-3">
      {POSTS.map((post) => (
        <ContextMenu key={post.id}>
          <ContextMenuTrigger className="block w-full cursor-default rounded-xl border px-4 py-3 text-left">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-sm">{post.author}</span>
              <span className="text-muted-foreground text-xs">
                {post.time} ago
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {post.body}
            </p>
            <div className="mt-3 flex items-center gap-3 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <ArrowUpIcon className="size-3.5" />
                {votes[post.id]}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquareIcon className="size-3.5" />
                Reply
              </span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-44">
            <ContextMenuGroup>
              <ContextMenuItem
                onSelect={() =>
                  setVotes((v) => ({ ...v, [post.id]: v[post.id] + 1 }))
                }
              >
                <ThumbsUpIcon />
                Upvote
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() =>
                  setVotes((v) => ({
                    ...v,
                    [post.id]: Math.max(0, v[post.id] - 1),
                  }))
                }
              >
                <ThumbsDownIcon />
                Downvote
              </ContextMenuItem>
              <ContextMenuItem>
                <MessageSquareIcon />
                Reply
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <FlagIcon />
                Report
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuGroup>
                  <ContextMenuItem>Spam</ContextMenuItem>
                  <ContextMenuItem>Misinformation</ContextMenuItem>
                  <ContextMenuItem>Harassment</ContextMenuItem>
                  <ContextMenuItem>Off-topic</ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">
                <UserXIcon />
                Mute author
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
}
