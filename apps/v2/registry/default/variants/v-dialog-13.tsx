"use client";

import { AlertTriangleIcon } from "lucide-react";
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

const REASONS = [
  "Too expensive",
  "Not using it enough",
  "Missing features I need",
  "Switching to a competitor",
  "Other",
];

export default function Particle() {
  const [reason, setReason] = useState("");

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Cancel subscription
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangleIcon className="size-5 text-destructive" />
          </div>
          <DialogTitle>Cancel your plan</DialogTitle>
          <DialogDescription>
            We&apos;re sorry to see you go. Help us improve by telling us why
            you&apos;re leaving.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-2">
          {REASONS.map((r) => (
            <button
              className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                reason === r
                  ? "border-destructive bg-destructive/5 text-destructive"
                  : "text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              }`}
              key={r}
              onClick={() => setReason(r)}
              type="button"
            >
              <span
                className={`size-4 shrink-0 rounded-full border-2 ${
                  reason === r
                    ? "border-destructive bg-destructive"
                    : "border-muted-foreground"
                }`}
              />
              {r}
            </button>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>
            Keep plan
          </DialogClose>
          <Button disabled={!reason} variant="destructive">
            Confirm cancellation
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
