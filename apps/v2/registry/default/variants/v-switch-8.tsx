"use client";

import { BarChart3Icon, BugIcon, DatabaseIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";

import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

const features = [
  {
    checked: true,
    description: "Track page views and user interactions",
    icon: <BarChart3Icon aria-hidden="true" className="size-4" />,
    id: "feat-analytics",
    title: "Analytics",
  },
  {
    checked: true,
    description: "Capture and report runtime errors",
    icon: <BugIcon aria-hidden="true" className="size-4" />,
    id: "feat-logging",
    title: "Error Logging",
  },
  {
    checked: false,
    description: "Serve static assets from edge network",
    icon: <GlobeIcon aria-hidden="true" className="size-4" />,
    id: "feat-cdn",
    title: "CDN Caching",
  },
  {
    checked: false,
    description: "Daily snapshots of your database",
    icon: <DatabaseIcon aria-hidden="true" className="size-4" />,
    id: "feat-backup",
    title: "Auto Backup",
  },
];

export function Pattern() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(features.map((f) => [f.id, f.checked])),
  );

  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-4">
      {features.map((feature) => (
        <Field key={feature.id}>
          <FieldLabel
            className={`h-full w-full cursor-pointer rounded-xl border p-3 transition-colors ${
              checked[feature.id]
                ? "border-primary/5 bg-sidebar"
                : "border-border"
            }`}
            htmlFor={feature.id}
          >
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <div
                  className={`flex shrink-0 items-center justify-center rounded-md border p-1.5 shadow-black/5 shadow-xs transition-colors ${
                    checked[feature.id]
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background"
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="font-semibold text-sm">{feature.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {feature.description}
                  </span>
                </div>
              </div>
              <Switch
                checked={checked[feature.id]}
                id={feature.id}
                onCheckedChange={(val) =>
                  setChecked((prev) => ({ ...prev, [feature.id]: val }))
                }
              />
            </div>
          </FieldLabel>
        </Field>
      ))}
    </div>
  );
}
