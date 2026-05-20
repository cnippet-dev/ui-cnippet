"use client";

import {
  CheckIcon,
  CopyIcon,
  GlobeIcon,
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  Share2Icon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const PAGE_URL = "https://cnippet.ui/components/popover";

const shareChannels = [
  { badge: undefined, icon: MailIcon, label: "Email" },
  { badge: undefined, icon: MessageSquareIcon, label: "Direct Message" },
  { badge: "Pro", icon: GlobeIcon, label: "Publish to Web" },
] as const;

export function Pattern() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PAGE_URL).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <Share2Icon aria-hidden="true" />
          Share
        </PopoverTrigger>
        <PopoverContent align="center" className="w-72 gap-0 p-0" side="bottom">
          <div className="border-b px-0 py-3">
            <h4 className="font-semibold">Share this page</h4>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Anyone with the link can view.
            </p>
          </div>

          <div className="space-y-3 px-0 py-3">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
              <LinkIcon
                aria-hidden="true"
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <span className="min-w-0 flex-1 truncate text-muted-foreground text-sm">
                {PAGE_URL}
              </span>
              <Button
                aria-label={copied ? "Copied!" : "Copy link"}
                className="size-6 shrink-0"
                onClick={handleCopy}
                size="icon"
                variant="ghost"
              >
                {copied ? (
                  <CheckIcon
                    aria-hidden="true"
                    className="size-3.5 text-emerald-500"
                  />
                ) : (
                  <CopyIcon aria-hidden="true" className="size-3.5" />
                )}
              </Button>
            </div>

            <div>
              <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Share via
              </p>
              <div className="space-y-0.5">
                {shareChannels.map(({ label, icon: Icon, badge }) => (
                  <button
                    className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    key={label}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded border bg-background">
                      <Icon aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="flex-1 text-left">{label}</span>
                    {badge && (
                      <Badge className="h-4 px-1 text-[10px]" variant="outline">
                        {badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t px-0 py-2.5">
            <p className="text-muted-foreground text-xs">
              Link expires in{" "}
              <span className="font-medium text-foreground">7 days</span>.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
