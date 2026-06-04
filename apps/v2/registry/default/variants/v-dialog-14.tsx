"use client";

import {
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  RefreshCwIcon,
} from "lucide-react";
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

function generateKey() {
  return `sk_live_${Array.from({ length: 32 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62),
    ),
  ).join("")}`;
}

export default function Particle() {
  const [apiKey, setApiKey] = useState(generateKey);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const masked = apiKey.slice(0, 7) + "•".repeat(32) + apiKey.slice(-4);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setRevealed(false);
        setCopied(false);
      }}
    >
      <DialogTrigger render={<Button variant="outline" />}>
        <KeyIcon className="size-4" />
        Generate API key
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your new API key</DialogTitle>
          <DialogDescription>
            Copy and store it now — you won&apos;t be able to see it again after
            closing this dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="break-all font-mono text-muted-foreground text-xs">
              {revealed ? apiKey : masked}
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleCopy} variant="outline">
              <CopyIcon className="size-4" />
              {copied ? "Copied!" : "Copy key"}
            </Button>
            <Button
              onClick={() => setRevealed((v) => !v)}
              size="icon"
              variant="outline"
            >
              {revealed ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </Button>
            <Button
              onClick={() => {
                setApiKey(generateKey());
                setRevealed(false);
                setCopied(false);
              }}
              size="icon"
              variant="outline"
            >
              <RefreshCwIcon className="size-4" />
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            This key grants full API access. Never share it in public
            repositories or client-side code.
          </p>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button />}>Done</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
