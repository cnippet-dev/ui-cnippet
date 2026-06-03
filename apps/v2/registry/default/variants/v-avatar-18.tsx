import { HeartIcon, MessageCircleIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const comments = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    body: "This is a great addition! The implementation looks clean. One suggestion — could we add a `size` variant for compact use cases as well?",
    initials: "AJ",
    likes: 4,
    name: "Alex Johnson",
    time: "2h ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    body: "Agreed on the size variants. Also, the aria-label is missing on the icon-only button — should be easy to fix before merging.",
    initials: "SC",
    likes: 2,
    name: "Sarah Chen",
    time: "1h ago",
  },
  {
    avatar: "https://github.com/shadcn.png",
    body: "Good catches, both addressed in the latest commit. Marking as ready for review.",
    initials: "SH",
    likes: 7,
    name: "shadcn",
    time: "45m ago",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="flex items-center gap-2 px-4 py-2.5!">
          <MessageCircleIcon className="size-4 text-muted-foreground" />
          <span className="font-medium text-sm">
            {comments.length} comments
          </span>
        </FramePanel>
        {comments.map((c, i) => (
          <FramePanel
            className={i === comments.length - 1 ? "rounded-b-xl" : ""}
            key={c.initials}
          >
            <div className="flex gap-3">
              <Avatar className="mt-0.5 size-7 shrink-0">
                <AvatarImage alt={c.name} src={c.avatar} />
                <AvatarFallback className="text-xs">
                  {c.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{c.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {c.time}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {c.body}
                </p>
                <Button
                  className="h-auto w-fit gap-1 p-0 text-muted-foreground"
                  size="xs"
                  variant="ghost"
                >
                  <HeartIcon className="size-3.5" />
                  <span className="text-xs">{c.likes}</span>
                </Button>
              </div>
            </div>
          </FramePanel>
        ))}
      </Frame>
    </div>
  );
}
