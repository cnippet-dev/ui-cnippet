"use client";

import {
  CheckIcon,
  CopyIcon,
  KeyIcon,
  LinkIcon,
  WebhookIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const fields = [
  { icon: KeyIcon, label: "API Key", value: "sk_live_9xKqP2mN...8rTv" },
  { icon: LinkIcon, label: "Endpoint", value: "https://api.cnippet.ui/v2" },
  {
    icon: WebhookIcon,
    label: "Webhook",
    value: "https://hooks.cnippet.ui/events",
  },
] as const;

export function Pattern() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = (value: string, id: string) => {
    navigator.clipboard.writeText(value).catch(() => null);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-25 items-center justify-center">
      <TooltipProvider>
        <div className="w-72 space-y-1.5 rounded-xl border bg-background p-3 shadow-xs">
          {fields.map(({ icon: Icon, label, value }) => (
            <div
              className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2"
              key={label}
            >
              <Icon
                aria-hidden="true"
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wide">
                  {label}
                </p>
                <p className="truncate font-mono text-xs">{value}</p>
              </div>
              <Tooltip>
                <TooltipTrigger
                  className="shrink-0"
                  onClick={() => copy(value, label)}
                  render={
                    <Button
                      aria-label={
                        copiedId === label ? "Copied" : `Copy ${label}`
                      }
                      className="size-6"
                      size="icon"
                      variant="ghost"
                    />
                  }
                >
                  {copiedId === label ? (
                    <CheckIcon
                      aria-hidden="true"
                      className="size-3.5 text-emerald-500"
                    />
                  ) : (
                    <CopyIcon aria-hidden="true" className="size-3.5" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {copiedId === label ? "Copied!" : "Copy to clipboard"}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
