"use client";

import { KeyRoundIcon } from "lucide-react";
import { useState } from "react";
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
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

const CONFIRM_TEXT = "transfer";

export function Pattern() {
  const [value, setValue] = useState("");
  const confirmed = value === CONFIRM_TEXT;

  return (
    <AlertDialog onOpenChange={(open) => !open && setValue("")}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive-outline">Transfer Ownership</Button>
        }
      />
      <AlertDialogContent className="sm:max-w-sm">
        <div className="flex items-start gap-3 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950">
            <KeyRoundIcon className="size-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex flex-col gap-1">
            <AlertDialogTitle className="font-semibold text-sm">
              Transfer organization ownership
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              This transfers full ownership to another member. You will lose
              admin privileges immediately and cannot undo this.
            </AlertDialogDescription>
          </div>
        </div>
        <div className="mx-4 mb-4 flex flex-col gap-2">
          <Label className="text-sm" htmlFor="confirm-transfer">
            Type <span className="font-mono font-semibold">{CONFIRM_TEXT}</span>{" "}
            to confirm
          </Label>
          <Input
            id="confirm-transfer"
            onChange={(e) => setValue(e.target.value)}
            placeholder={CONFIRM_TEXT}
            value={value}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose
            render={<Button disabled={!confirmed} variant="destructive" />}
          >
            Transfer Ownership
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
