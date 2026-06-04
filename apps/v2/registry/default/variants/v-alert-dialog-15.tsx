"use client";

import { TimerIcon, ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { Button } from "@/registry/default/ui/button";

function Countdown({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const m = Math.floor(left / 60)
    .toString()
    .padStart(2, "0");
  const s = (left % 60).toString().padStart(2, "0");

  return (
    <span className="font-mono font-semibold text-foreground">
      {m}:{s}
    </span>
  );
}

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Make API Request</Button>} />
      <AlertDialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center gap-3 p-6 pb-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950">
            <ZapIcon className="size-5 text-amber-600 dark:text-amber-400" />
          </div>
          <AlertDialogTitle className="text-center font-semibold text-base">
            Rate limit exceeded
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground text-sm">
            You&apos;ve reached the limit of 100 requests per minute. Retry
            automatically in:
          </AlertDialogDescription>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/60 px-4 py-2 text-sm">
            <TimerIcon className="size-4 text-muted-foreground" />
            <Countdown seconds={90} />
          </div>
          <p className="text-center text-muted-foreground text-xs">
            Upgrade to Pro for a 10× higher rate limit.
          </p>
        </div>
        <AlertDialogFooter className="px-6 pb-6">
          <AlertDialogClose
            render={<Button className="flex-1" variant="outline" />}
          >
            Dismiss
          </AlertDialogClose>
          <AlertDialogClose render={<Button className="flex-1" />}>
            Upgrade to Pro
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
