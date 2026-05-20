import { ActivityIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
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

type EventType = "deploy" | "merge" | "comment" | "invite" | "update";

type ActivityEvent = {
  id: number;
  user: { name: string; avatar?: string; initials: string };
  action: string;
  target: string;
  time: string;
  type: EventType;
};

const typeBadge: Record<EventType, { label: string; className: string }> = {
  comment: {
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    label: "Comment",
  },
  deploy: {
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    label: "Deploy",
  },
  invite: {
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
    label: "Invite",
  },
  merge: {
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    label: "Merge",
  },
  update: {
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    label: "Update",
  },
};

const events: ActivityEvent[] = [
  {
    action: "deployed",
    id: 1,
    target: "v2.4.1 to production",
    time: "Just now",
    type: "deploy",
    user: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&dpr=2&q=80",
      initials: "SC",
      name: "Sarah Chen",
    },
  },
  {
    action: "merged PR #84",
    id: 2,
    target: "feat/dark-mode into main",
    time: "18 min ago",
    type: "merge",
    user: {
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&dpr=2&q=80",
      initials: "MK",
      name: "Marcus Kim",
    },
  },
  {
    action: "commented on",
    id: 3,
    target: "issue #112: Layout shift",
    time: "42 min ago",
    type: "comment",
    user: { initials: "AJ", name: "Aisha Johnson" },
  },
  {
    action: "invited",
    id: 4,
    target: "priya@example.com as Editor",
    time: "2 hr ago",
    type: "invite",
    user: { initials: "SC", name: "Sarah Chen" },
  },
  {
    action: "updated",
    id: 5,
    target: "project description and README",
    time: "5 hr ago",
    type: "update",
    user: {
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80",
      initials: "LR",
      name: "Liam Rivera",
    },
  },
  {
    action: "deployed",
    id: 6,
    target: "v2.3.9 hotfix to production",
    time: "Yesterday",
    type: "deploy",
    user: { initials: "AJ", name: "Aisha Johnson" },
  },
];

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <ActivityIcon aria-hidden="true" />
          Activity Log
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Activity Log</SheetTitle>
            <SheetDescription>
              Recent actions taken across this project.
            </SheetDescription>
          </SheetHeader>
          <SheetPanel className="px-3">
            <div className="relative space-y-0">
              {events.map((event, index) => {
                const badge = typeBadge[event.type];
                return (
                  <div className="relative flex gap-3 pb-5" key={event.id}>
                    {index < events.length - 1 && (
                      <div className="absolute top-8 left-4 h-full w-px bg-border" />
                    )}
                    <Avatar className="z-10 size-8 shrink-0 ring-2 ring-background">
                      {event.user.avatar && (
                        <AvatarImage
                          alt={event.user.name}
                          src={event.user.avatar}
                        />
                      )}
                      <AvatarFallback className="text-xs">
                        {event.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-medium text-sm">
                          {event.user.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {event.action}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-medium text-[10px] ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-muted-foreground text-xs">
                        {event.target}
                      </p>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {event.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SheetPanel>
          <SheetFooter variant="bare">
            <SheetClose
              render={<Button className="w-full" variant="outline" />}
            >
              Close
            </SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
