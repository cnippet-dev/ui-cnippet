import { BellIcon, GitPullRequestIcon, MessageSquareIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const notifications = [
  {
    count: 12,
    icon: MessageSquareIcon,
    label: "Messages",
    variant: "default" as const,
  },
  {
    count: 3,
    icon: BellIcon,
    label: "Mentions",
    variant: "destructive" as const,
  },
  {
    count: 7,
    icon: GitPullRequestIcon,
    label: "Reviews",
    variant: "info" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Frame>
        <FramePanel>
          <p className="mb-3 font-semibold text-sm">Notifications</p>
          <div className="flex flex-col gap-1.5">
            {notifications.map((n) => (
              <Button
                className="h-auto justify-between px-2 py-2"
                key={n.label}
                variant="ghost"
              >
                <span className="flex items-center gap-2 text-sm">
                  <n.icon className="size-4 text-muted-foreground" />
                  {n.label}
                </span>
                <Badge size="sm" variant={n.variant}>
                  {n.count}
                </Badge>
              </Button>
            ))}
          </div>
        </FramePanel>
      </Frame>
    </div>
  );
}
