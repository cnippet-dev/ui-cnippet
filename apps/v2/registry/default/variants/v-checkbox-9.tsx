"use client";

import {
  BellIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { Separator } from "@/registry/default/ui/separator";

const channels = [
  {
    description: "Receive updates in your inbox",
    icon: MailIcon,
    id: "ch-email",
    label: "Email",
  },
  {
    description: "Alerts sent to your phone",
    icon: SmartphoneIcon,
    id: "ch-sms",
    label: "SMS",
  },
  {
    description: "Banners while using the app",
    icon: BellIcon,
    id: "ch-inapp",
    label: "In-app",
  },
  {
    description: "Messages to your Slack workspace",
    icon: MessageSquareIcon,
    id: "ch-slack",
    label: "Slack",
  },
];

export function Pattern() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "ch-email": true,
    "ch-inapp": true,
    "ch-slack": false,
    "ch-sms": false,
  });

  const toggle = (id: string, val: boolean) =>
    setChecked((prev) => ({ ...prev, [id]: val }));

  return (
    <div className="w-full max-w-xs">
      <p className="mb-3 font-semibold text-sm">Notification channels</p>
      <Separator className="mb-1" />
      {channels.map((ch) => {
        const Icon = ch.icon;
        return (
          <label
            className="flex cursor-pointer items-start gap-3 border-b py-3 last:border-b-0"
            htmlFor={ch.id}
            key={ch.id}
          >
            <Checkbox
              checked={checked[ch.id]}
              id={ch.id}
              onCheckedChange={(val) => toggle(ch.id, !!val)}
            />
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
                checked[ch.id]
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-border bg-muted/50 text-muted-foreground"
              }`}
            >
              <Icon className="size-3.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="pt-0.5 font-medium text-sm leading-none">
                {ch.label}
              </span>
              <span className="text-muted-foreground text-xs">
                {ch.description}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
