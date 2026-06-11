"use client";

import { useId, useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";

const TASKS = [
  { id: "t1", label: "Review pull request #142", priority: "high" },
  { id: "t2", label: "Update API documentation", priority: "medium" },
  { id: "t3", label: "Fix login redirect bug", priority: "high" },
  { id: "t4", label: "Write unit tests for AuthService", priority: "medium" },
  { id: "t5", label: "Migrate legacy endpoints to v2", priority: "low" },
  { id: "t6", label: "Deploy staging environment", priority: "low" },
];

const priorityVariant: Record<string, "destructive" | "warning" | "secondary"> =
  {
    high: "destructive",
    low: "secondary",
    medium: "warning",
  };

export function Pattern() {
  const id = useId();
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggle = (tid: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(tid) ? next.delete(tid) : next.add(tid);
      return next;
    });

  const remaining = TASKS.length - done.size;

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Sprint Tasks</p>
        <span className="text-muted-foreground text-xs">
          {remaining} remaining
        </span>
      </div>
      <div className="space-y-0.5">
        {TASKS.map((task) => (
          <label
            className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50 ${done.has(task.id) ? "opacity-50" : ""}`}
            htmlFor={`${id}-${task.id}`}
            key={task.id}
          >
            <Checkbox
              checked={done.has(task.id)}
              id={`${id}-${task.id}`}
              onCheckedChange={() => toggle(task.id)}
            />
            <span
              className={`flex-1 text-sm ${done.has(task.id) ? "text-muted-foreground line-through" : ""}`}
            >
              {task.label}
            </span>
            <Badge size="sm" variant={priorityVariant[task.priority]}>
              {task.priority}
            </Badge>
          </label>
        ))}
      </div>
      {remaining === 0 && (
        <div className="rounded-lg bg-emerald-50 px-4 py-2.5 text-center font-medium text-emerald-700 text-sm dark:bg-emerald-950/40 dark:text-emerald-400">
          All tasks complete! 🎉
        </div>
      )}
      <Button
        className="w-full"
        onClick={() => setDone(new Set())}
        size="sm"
        variant="outline"
      >
        Reset
      </Button>
    </div>
  );
}
