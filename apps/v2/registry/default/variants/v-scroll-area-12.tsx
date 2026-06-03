import {
  BellIcon,
  CheckCheckIcon,
  MessageSquareIcon,
  UserPlusIcon,
} from "lucide-react";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const notifications = [
  {
    Icon: MessageSquareIcon,
    id: 1,
    message: "Alex commented on your pull request.",
    read: false,
    time: "2m ago",
  },
  {
    Icon: UserPlusIcon,
    id: 2,
    message: "Sarah accepted your team invitation.",
    read: false,
    time: "15m ago",
  },
  {
    Icon: CheckCheckIcon,
    id: 3,
    message: "Deployment to production was successful.",
    read: true,
    time: "1h ago",
  },
  {
    Icon: MessageSquareIcon,
    id: 4,
    message: "Jordan left a review on your design.",
    read: true,
    time: "2h ago",
  },
  {
    Icon: BellIcon,
    id: 5,
    message: "Your free trial expires in 3 days.",
    read: true,
    time: "5h ago",
  },
  {
    Icon: UserPlusIcon,
    id: 6,
    message: "New team member joined: Morgan.",
    read: true,
    time: "1d ago",
  },
  {
    Icon: CheckCheckIcon,
    id: 7,
    message: "Staging environment updated successfully.",
    read: true,
    time: "2d ago",
  },
];

export default function Particle() {
  return (
    <ScrollArea className="h-72 w-full max-w-sm rounded-lg border">
      <div className="flex flex-col">
        {notifications.map(({ Icon, id, message, read, time }) => (
          <div
            className={`flex items-start gap-3 border-b px-4 py-3 last:border-b-0 ${!read ? "bg-accent/30" : ""}`}
            key={id}
          >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon aria-hidden="true" className="size-4" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-sm">{message}</p>
              <span className="text-muted-foreground text-xs">{time}</span>
            </div>
            {!read && (
              <span
                aria-label="Unread"
                className="mt-2 size-2 shrink-0 rounded-full bg-primary"
              />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
