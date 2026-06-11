"use client";

import { BellIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const initialNotifications = [
  {
    id: 1,
    read: false,
    text: "Jamie left a comment on your post.",
    time: "2m ago",
  },
  {
    id: 2,
    read: false,
    text: "Your export is ready to download.",
    time: "15m ago",
  },
  {
    id: 3,
    read: true,
    text: "Alex invited you to join the workspace.",
    time: "1h ago",
  },
];

export function Pattern() {
  const [items, setItems] = useState(initialNotifications);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger
          aria-label="Notifications"
          render={<Button size="icon" variant="outline" />}
        >
          <span className="relative">
            <BellIcon aria-hidden="true" className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-destructive font-bold text-[9px] text-destructive-foreground">
                {unread}
              </span>
            )}
          </span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 gap-0 p-0">
          <div className="flex items-center justify-between border-b px-3 py-2.5">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">Notifications</h4>
              {unread > 0 && <Badge size="sm">{unread}</Badge>}
            </div>
            <button
              className="text-muted-foreground text-xs hover:text-foreground"
              onClick={() =>
                setItems((p) => p.map((n) => ({ ...n, read: true })))
              }
              type="button"
            >
              Mark all read
            </button>
          </div>
          <div className="divide-y">
            {items.map((n) => (
              <button
                className={`flex w-full gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted ${n.read ? "opacity-60" : ""}`}
                key={n.id}
                onClick={() =>
                  setItems((p) =>
                    p.map((item) =>
                      item.id === n.id ? { ...item, read: true } : item,
                    ),
                  )
                }
                type="button"
              >
                <span
                  className={`mt-1.5 size-1.5 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-primary"}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-muted-foreground text-xs">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
