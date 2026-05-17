import { CheckIcon } from "lucide-react";
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
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Task Status</Button>}
      />
      <AlertDialogContent>
        <div className="flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckIcon className="size-5" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <AlertDialogTitle className="font-semibold text-sm">
              Task successful
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Your task has been completed successfully.
            </AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter className="items-center gap-4 sm:justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="show-again" />
            <Label
              className="font-normal text-muted-foreground"
              htmlFor="show-again"
            >
              Don&apos;t show again
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<Button />}>Confirm</AlertDialogClose>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
