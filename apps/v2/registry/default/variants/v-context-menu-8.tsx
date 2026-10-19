// title: Inbox rows with destructive delete
"use client";

import {
  ArchiveIcon,
  ForwardIcon,
  MailIcon,
  MailOpenIcon,
  ReplyIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const MESSAGES = [
  {
    from: "Sofia Reyes",
    id: "m1",
    preview: "Can you take a look at the pricing page copy?",
    subject: "Pricing copy review",
    time: "9:41",
    unread: true,
  },
  {
    from: "Dan Moss",
    id: "m2",
    preview: "The deploy went out without issues. Notes inside.",
    subject: "Release 2.4 shipped",
    time: "8:15",
    unread: true,
  },
  {
    from: "Billing",
    id: "m3",
    preview: "Your invoice for October is ready to download.",
    subject: "Invoice #1042",
    time: "Mon",
    unread: false,
  },
];

export function ContextMenuDestructive() {
  const [messages, setMessages] = useState(MESSAGES);

  const remove = (id: string) =>
    setMessages((prev) => prev.filter((m) => m.id !== id));
  const toggleRead = (id: string) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m)),
    );

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-background shadow-xs/5">
      <div className="flex items-baseline justify-between border-b px-3 py-2">
        <p className="font-semibold text-sm">Inbox</p>
        <p className="text-muted-foreground text-xs">
          <span className="pointer-fine:inline hidden">
            Right-click a message
          </span>
          <span className="pointer-coarse:inline hidden">
            Long-press a message
          </span>
        </p>
      </div>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">No messages left.</p>
          <Button
            onClick={() => setMessages(MESSAGES)}
            size="sm"
            variant="outline"
          >
            Restore inbox
          </Button>
        </div>
      ) : (
        messages.map((message) => (
          <ContextMenu key={message.id}>
            <ContextMenuTrigger className="flex w-full gap-3 border-b px-3 py-2.5 last:border-b-0 data-popup-open:bg-muted/60">
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  message.unread ? "bg-primary" : "bg-transparent",
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-sm",
                      message.unread && "font-semibold",
                    )}
                  >
                    {message.from}
                  </p>
                  <span className="shrink-0 text-muted-foreground text-xs">
                    {message.time}
                  </span>
                </div>
                <p className="truncate text-sm">{message.subject}</p>
                <p className="truncate text-muted-foreground text-xs">
                  {message.preview}
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuGroup>
                <ContextMenuItem>
                  <ReplyIcon />
                  Reply
                  <ContextMenuShortcut>R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <ForwardIcon />
                  Forward
                  <ContextMenuShortcut>F</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => toggleRead(message.id)}>
                  {message.unread ? <MailOpenIcon /> : <MailIcon />}
                  {message.unread ? "Mark as read" : "Mark as unread"}
                </ContextMenuItem>
                <ContextMenuItem onClick={() => remove(message.id)}>
                  <ArchiveIcon />
                  Archive
                  <ContextMenuShortcut>E</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem
                  onClick={() => remove(message.id)}
                  variant="destructive"
                >
                  <TrashIcon />
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        ))
      )}
    </div>
  );
}
