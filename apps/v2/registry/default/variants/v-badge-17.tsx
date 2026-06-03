import { Badge } from "@/registry/default/ui/badge";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

type Priority = "urgent" | "high" | "medium" | "low";

const priorityVariant: Record<
  Priority,
  "destructive" | "warning" | "info" | "secondary"
> = {
  high: "warning",
  low: "secondary",
  medium: "info",
  urgent: "destructive",
};

const tasks = [
  {
    assignee: "Alex J.",
    priority: "urgent" as Priority,
    title: "Fix authentication token refresh race condition",
  },
  {
    assignee: "Sarah C.",
    priority: "high" as Priority,
    title: "Migrate legacy REST endpoints to GraphQL",
  },
  {
    assignee: "Marcus R.",
    priority: "medium" as Priority,
    title: "Add dark mode support to dashboard charts",
  },
  {
    assignee: "Laura P.",
    priority: "low" as Priority,
    title: "Update onboarding copy for new signup flow",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Frame>
        {tasks.map((task) => (
          <FramePanel
            className="flex items-start justify-between gap-3"
            key={task.title}
          >
            <div className="flex flex-1 flex-col gap-1">
              <span className="font-medium text-sm">{task.title}</span>
              <span className="text-muted-foreground text-xs">
                {task.assignee}
              </span>
            </div>
            <Badge
              className="shrink-0 capitalize"
              size="sm"
              variant={priorityVariant[task.priority]}
            >
              {task.priority}
            </Badge>
          </FramePanel>
        ))}
      </Frame>
    </div>
  );
}
