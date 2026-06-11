"use client";

import {
  ArchiveIcon,
  CheckCircle2Icon,
  CircleIcon,
  ClockIcon,
  TagIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

type Status = "todo" | "in-progress" | "done";
type Task = {
  assignee: string;
  id: string;
  priority: "high" | "medium" | "low";
  status: Status;
  title: string;
};

const INITIAL: Task[] = [
  {
    assignee: "AK",
    id: "t1",
    priority: "high",
    status: "in-progress",
    title: "Refactor auth middleware",
  },
  {
    assignee: "SR",
    id: "t2",
    priority: "medium",
    status: "todo",
    title: "Write API documentation",
  },
  {
    assignee: "MN",
    id: "t3",
    priority: "low",
    status: "done",
    title: "Update README",
  },
];

const statusIcon: Record<Status, React.ReactNode> = {
  done: <CheckCircle2Icon className="size-3.5 text-emerald-500" />,
  "in-progress": <ClockIcon className="size-3.5 text-blue-500" />,
  todo: <CircleIcon className="size-3.5 text-muted-foreground" />,
};

const priorityVariant: Record<
  Task["priority"],
  "destructive" | "warning" | "secondary"
> = {
  high: "destructive",
  low: "secondary",
  medium: "warning",
};

export function Pattern() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL);

  const updateTask = (id: string, patch: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="w-full max-w-sm space-y-1 rounded-xl border p-1">
      {tasks.map((task) => (
        <ContextMenu key={task.id}>
          <ContextMenuTrigger className="flex w-full cursor-default items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted">
            {statusIcon[task.status]}
            <span className="flex-1">{task.title}</span>
            <div className="flex items-center gap-2">
              <Badge size="sm" variant={priorityVariant[task.priority]}>
                {task.priority}
              </Badge>
              <span className="flex size-6 items-center justify-center rounded-full bg-muted font-semibold text-[10px]">
                {task.assignee}
              </span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuLabel>Status</ContextMenuLabel>
            <ContextMenuRadioGroup
              onValueChange={(v) =>
                updateTask(task.id, { status: v as Status })
              }
              value={task.status}
            >
              <ContextMenuRadioItem value="todo">To Do</ContextMenuRadioItem>
              <ContextMenuRadioItem value="in-progress">
                In Progress
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="done">Done</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <TagIcon />
                Priority
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuRadioGroup
                  onValueChange={(v) =>
                    updateTask(task.id, { priority: v as Task["priority"] })
                  }
                  value={task.priority}
                >
                  <ContextMenuRadioItem value="high">High</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="medium">
                    Medium
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="low">Low</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuGroup>
              <ContextMenuItem>
                <UserIcon />
                Reassign
              </ContextMenuItem>
              <ContextMenuItem>
                <ArchiveIcon />
                Archive
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem
                onSelect={() => removeTask(task.id)}
                variant="destructive"
              >
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
}
