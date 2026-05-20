"use client";

import {
  CalendarIcon,
  CircleDotIcon,
  FlagIcon,
  MessageSquareIcon,
  PaperclipIcon,
  SendIcon,
  TagIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";
import { Textarea } from "@/registry/default/ui/textarea";

const comments = [
  {
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&dpr=2&q=80",
    body: "I think we should also handle the edge case where the session token expires mid-request. Should we add a refresh flow?",
    id: 1,
    initials: "MK",
    name: "Marcus Kim",
    time: "2 hr ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&dpr=2&q=80",
    body: "Good point. I'll add that to the acceptance criteria. The refresh logic can live in the auth middleware.",
    id: 2,
    initials: "SC",
    name: "Sarah Chen",
    time: "1 hr ago",
  },
];

const meta = [
  {
    icon: CircleDotIcon,
    label: "Status",
    value: (
      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
        In Progress
      </Badge>
    ),
  },
  {
    icon: FlagIcon,
    label: "Priority",
    value: (
      <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
        High
      </Badge>
    ),
  },
  {
    icon: CalendarIcon,
    label: "Due date",
    value: <span className="text-sm">Jun 15, 2025</span>,
  },
  {
    icon: TagIcon,
    label: "Labels",
    value: (
      <div className="flex gap-1">
        <Badge variant="outline">auth</Badge>
        <Badge variant="outline">backend</Badge>
      </div>
    ),
  },
];

export function Pattern() {
  const [comment, setComment] = useState("");

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <CircleDotIcon aria-hidden="true" />
          View Issue
        </SheetTrigger>
        <SheetPopup className="sm:max-w-lg">
          <SheetHeader>
            <div className="flex items-start gap-2 pr-8">
              <SheetTitle className="leading-snug">
                Implement session refresh for expired auth tokens
              </SheetTitle>
            </div>
            <SheetDescription>Issue #117 · opened 3 days ago</SheetDescription>
          </SheetHeader>
          <SheetPanel className="space-y-5">
            <div className="divide-y rounded-lg border">
              {meta.map(({ icon: Icon, label, value }) => (
                <div className="flex items-center gap-3 px-3 py-2" key={label}>
                  <Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted-foreground"
                  />
                  <span className="w-20 shrink-0 text-muted-foreground text-xs">
                    {label}
                  </span>
                  {value}
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 font-medium text-sm">Description</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When a user's session token expires mid-request, the app should
                silently refresh the token using the refresh token stored in an
                HttpOnly cookie and retry the original request without any user
                interruption.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium text-sm">
                <MessageSquareIcon className="size-3.5" />
                Comments ({comments.length})
              </div>
              {comments.map((c) => (
                <div className="flex gap-3" key={c.id}>
                  <Avatar className="size-7 shrink-0">
                    <AvatarImage alt={c.name} src={c.avatar} />
                    <AvatarFallback className="text-xs">
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 rounded-lg border p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-xs">{c.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {c.time}
                      </span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <Avatar className="size-7 shrink-0">
                  <AvatarImage
                    alt="You"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80"
                  />
                  <AvatarFallback className="text-xs">LR</AvatarFallback>
                </Avatar>
                <Textarea
                  className="min-h-[72px] flex-1 resize-none text-sm"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment…"
                  value={comment}
                />
              </div>
            </div>
          </SheetPanel>
          <SheetFooter>
            <div className="flex w-full items-center justify-between gap-2">
              <Button size="icon" variant="ghost">
                <PaperclipIcon className="size-4" />
              </Button>
              <div className="flex gap-2">
                <SheetClose render={<Button variant="ghost" />}>
                  Close
                </SheetClose>
                <Button disabled={!comment.trim()}>
                  <SendIcon className="size-3.5" />
                  Comment
                </Button>
              </div>
            </div>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
