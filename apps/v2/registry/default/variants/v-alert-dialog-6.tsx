import { CardSimIcon } from "lucide-react";
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
import { Frame, FramePanel } from "@/registry/default/ui/frame";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Discard Changes</Button>}
      />
      <AlertDialogContent className="overflow-hidden p-0! ring-0">
        <Frame className="p-px">
          <FramePanel className="p-0">
            <div className="flex items-start gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-300">
                <CardSimIcon className="size-5" />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <AlertDialogTitle className="font-semibold text-sm">
                  Unsaved changes
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground text-sm">
                  You have unsaved changes in this form. If you leave now, your
                  progress will be lost.
                </AlertDialogDescription>
              </div>
            </div>
            <AlertDialogFooter className="mt-2 items-center gap-4 sm:justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="dont-ask-again" />
                <Label
                  className="font-normal text-muted-foreground"
                  htmlFor="dont-ask-again"
                >
                  Don&apos;t ask again
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <AlertDialogClose render={<Button variant="ghost" />}>
                  Stay
                </AlertDialogClose>
                <AlertDialogClose render={<Button />}>
                  Discard Changes
                </AlertDialogClose>
              </div>
            </AlertDialogFooter>
          </FramePanel>
        </Frame>
      </AlertDialogContent>
    </AlertDialog>
  );
}
