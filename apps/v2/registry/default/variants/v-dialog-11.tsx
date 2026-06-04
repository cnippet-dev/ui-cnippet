"use client";

import { CheckIcon, CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Input } from "@/registry/default/ui/input";

const SHARE_LINK = "https://app.example.com/docs/q3-roadmap?share=abc123";

export default function Particle() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SHARE_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        <LinkIcon className="size-4" />
        Share
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share document</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this document.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          <div className="flex gap-2">
            <Input
              className="flex-1 font-mono text-xs"
              readOnly
              value={SHARE_LINK}
            />
            <Button
              className="shrink-0"
              onClick={handleCopy}
              size="icon"
              variant="outline"
            >
              {copied ? (
                <CheckIcon className="size-4 text-green-500" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </Button>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Link access
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["View only", "Can comment", "Can edit"].map((perm) => (
                <button
                  className={`rounded-md border px-3 py-2 font-medium text-xs transition-colors ${
                    perm === "View only"
                      ? "border-primary bg-primary/5 text-primary"
                      : "text-muted-foreground hover:border-foreground/30"
                  }`}
                  key={perm}
                  type="button"
                >
                  {perm}
                </button>
              ))}
            </div>
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Done</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
