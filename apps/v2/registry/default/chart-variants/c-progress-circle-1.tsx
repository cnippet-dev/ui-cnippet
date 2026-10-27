"use client";

import { CheckIcon } from "lucide-react";
import { ProgressCircle } from "@/registry/default/charts/progress-circle";

const steps = [
  { done: true, name: "Add a profile photo" },
  { done: true, name: "Verify your email" },
  { done: true, name: "Connect a calendar" },
  { done: false, name: "Invite a teammate" },
];

export default function ProfileCompletion() {
  const done = steps.filter((s) => s.done).length;
  const percent = Math.round((done / steps.length) * 100);

  return (
    <div className="flex w-full max-w-sm items-start gap-5 rounded-lg border bg-card p-5">
      <ProgressCircle aria-label="Profile completion" size={72} value={percent}>
        {percent}%
      </ProgressCircle>
      <div className="flex-1">
        <div className="font-medium text-sm">Finish setting up</div>
        <ul className="mt-2 grid gap-1.5 text-sm">
          {steps.map((s) => (
            <li
              className={
                s.done
                  ? "flex items-center gap-2 text-muted-foreground line-through"
                  : "flex items-center gap-2"
              }
              key={s.name}
            >
              <CheckIcon
                aria-hidden="true"
                className={
                  s.done ? "size-3.5 text-success" : "size-3.5 opacity-0"
                }
              />
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
