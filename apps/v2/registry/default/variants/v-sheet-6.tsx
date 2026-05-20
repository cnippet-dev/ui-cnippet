"use client";

import {
  AtSignIcon,
  BellIcon,
  CheckCheckIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
} from "lucide-react";
import { useState } from "react";
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

type Notification = {
  id: number;
  icon: React.ElementType;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const initial: Notification[] = [
  {
    body: "Left a comment on your pull request #42.",
    icon: MessageSquareIcon,
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    id: 1,
    read: false,
    time: "2 min ago",
    title: "Sarah commented on your PR",
  },
  {
    body: "Mentioned you in the #design-review channel.",
    icon: AtSignIcon,
    iconBg:
      "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    id: 2,
    read: false,
    time: "14 min ago",
    title: "Marcus mentioned you",
  },
  {
    body: "Your PR #38 was approved and merged into main.",
    icon: GitPullRequestIcon,
    iconBg:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    id: 3,
    read: false,
    time: "1 hr ago",
    title: "PR merged successfully",
  },
  {
    body: "You've been assigned to issue #117: Dashboard redesign.",
    icon: BellIcon,
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    id: 4,
    read: true,
    time: "3 hr ago",
    title: "New issue assigned to you",
  },
];

export function Pattern() {
  const [notifications, setNotifications] = useState(initial);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <BellIcon aria-hidden="true" />
          Notifications
          {unread > 0 && (
            <Badge className="ml-0.5 h-4 px-1 text-[10px]">{unread}</Badge>
          )}
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Notifications</SheetTitle>
              {unread > 0 && (
                <Button
                  className="h-auto p-0 text-xs"
                  onClick={markAllRead}
                  variant="link"
                >
                  <CheckCheckIcon className="mr-1 size-3.5" />
                  Mark all read
                </Button>
              )}
            </div>
            <SheetDescription>
              {unread > 0
                ? `You have ${unread} unread notification${unread > 1 ? "s" : ""}.`
                : "You're all caught up."}
            </SheetDescription>
          </SheetHeader>
          <SheetPanel className="space-y-1 px-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${n.read ? "opacity-60" : ""}`}
                  key={n.id}
                  onClick={() => markRead(n.id)}
                >
                  <span
                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${n.iconBg}`}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-sm">{n.title}</p>
                      {!n.read && (
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {n.body}
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      {n.time}
                    </p>
                  </div>
                </button>
              );
            })}
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
