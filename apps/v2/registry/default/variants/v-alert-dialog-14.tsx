"use client";

import { Trash2Icon } from "lucide-react";
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
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const [agreed, setAgreed] = useState(false);

  return (
    <AlertDialog onOpenChange={(open) => !open && setAgreed(false)}>
      <AlertDialogTrigger
        render={<Button variant="destructive">Clear All Data</Button>}
      />
      <AlertDialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center gap-3 p-6 pb-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <Trash2Icon className="size-5 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center font-semibold">
            Clear all workspace data?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground text-sm">
            This permanently deletes all projects, files, members, and settings.
            This action is irreversible and cannot be undone.
          </AlertDialogDescription>
        </div>
        <div className="mx-6 mb-4 flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <Checkbox
            checked={agreed}
            id="clear-confirm"
            onCheckedChange={(v) => setAgreed(Boolean(v))}
          />
          <Label
            className="cursor-pointer text-muted-foreground text-sm leading-snug"
            htmlFor="clear-confirm"
          >
            I understand this will permanently delete all data and cannot be
            recovered.
          </Label>
        </div>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose
            render={<Button disabled={!agreed} variant="destructive" />}
          >
            Delete Everything
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
