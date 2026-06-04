"use client";

import { CalendarIcon, CheckIcon, FlagIcon } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

type Priority = "low" | "medium" | "high" | "urgent";

const priorities: {
  color: string;
  id: Priority;
  label: string;
}[] = [
  { color: "text-muted-foreground", id: "low", label: "Low" },
  { color: "text-blue-500", id: "medium", label: "Medium" },
  { color: "text-amber-500", id: "high", label: "High" },
  { color: "text-red-500", id: "urgent", label: "Urgent" },
];

const tasks = [
  { due: "Today", id: "t1", status: "open", title: "Review PR #482" },
  { due: "Tomorrow", id: "t2", status: "open", title: "Update API docs" },
  { due: "Jun 10", id: "t3", status: "open", title: "Write release notes" },
];

export function Pattern() {
  const [taskPriorities, setTaskPriorities] = useState<
    Record<string, Priority>
  >({ t1: "high", t2: "medium", t3: "low" });
  const [done, setDone] = useState<Set<string>>(new Set());

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="font-semibold text-sm">Task priority</p>
      {tasks.map((task) => (
        <div
          className={`rounded-lg border border-border p-3 transition-opacity ${done.has(task.id) ? "opacity-50" : ""}`}
          key={task.id}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Toggle
                aria-label={
                  done.has(task.id) ? "Mark incomplete" : "Mark complete"
                }
                className={
                  done.has(task.id)
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                }
                onPressedChange={() =>
                  setDone((prev) => {
                    const next = new Set(prev);
                    next.has(task.id)
                      ? next.delete(task.id)
                      : next.add(task.id);
                    return next;
                  })
                }
                pressed={done.has(task.id)}
                size="sm"
              >
                <CheckIcon className="size-3.5" />
              </Toggle>
              <span
                className={`font-medium text-sm ${done.has(task.id) ? "text-muted-foreground line-through" : ""}`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <CalendarIcon className="size-3" />
              {task.due}
            </div>
          </div>
          <div className="flex gap-1">
            {priorities.map((p) => (
              <Toggle
                aria-label={`Set ${p.label} priority`}
                className={`gap-1 text-xs ${taskPriorities[task.id] === p.id ? p.color : "text-muted-foreground/60"}`}
                key={p.id}
                onPressedChange={() =>
                  setTaskPriorities((prev) => ({ ...prev, [task.id]: p.id }))
                }
                pressed={taskPriorities[task.id] === p.id}
                size="sm"
              >
                <FlagIcon className="size-3" />
                {p.label}
              </Toggle>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
