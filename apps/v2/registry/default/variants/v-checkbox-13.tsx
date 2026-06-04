"use client";

import { useId, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";

const COLUMNS = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push" },
  { id: "sms", label: "SMS" },
];

const EVENTS = [
  { id: "new-message", label: "New message" },
  { id: "mention", label: "Mention" },
  { id: "task-assigned", label: "Task assigned" },
  { id: "comment", label: "Comment" },
  { id: "status-change", label: "Status change" },
];

type Prefs = Record<string, boolean>;

function cellKey(event: string, channel: string) {
  return `${event}__${channel}`;
}

export function Pattern() {
  const id = useId();
  const [prefs, setPrefs] = useState<Prefs>(() =>
    Object.fromEntries(
      EVENTS.flatMap((e) =>
        COLUMNS.map((c) => [cellKey(e.id, c.id), c.id === "email"]),
      ),
    ),
  );

  const toggle = (k: string) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="font-semibold text-sm">Notification Preferences</p>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="py-2 pr-4 pl-3 text-left font-medium text-muted-foreground">
                Event
              </th>
              {COLUMNS.map((c) => (
                <th
                  className="px-3 py-2 text-center font-medium text-muted-foreground"
                  key={c.id}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((evt, i) => (
              <tr
                className={i < EVENTS.length - 1 ? "border-b" : ""}
                key={evt.id}
              >
                <td className="py-2.5 pr-4 pl-3 text-foreground">
                  {evt.label}
                </td>
                {COLUMNS.map((ch) => {
                  const k = cellKey(evt.id, ch.id);
                  return (
                    <td className="px-3 py-2.5 text-center" key={ch.id}>
                      <Checkbox
                        checked={prefs[k]}
                        id={`${id}-${k}`}
                        onCheckedChange={() => toggle(k)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="w-full" size="sm">
        Save preferences
      </Button>
    </div>
  );
}
