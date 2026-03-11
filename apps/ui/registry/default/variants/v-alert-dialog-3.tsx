import { CardSimIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive-outline" />}>
        Discard Changes
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader className="flex flex-row gap-10">
          <div>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-300">
              <CardSimIcon className="size-5" />
            </div>
          </div>
          <div className="w-full">
            <AlertDialogTitle> Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in this form. If you leave now, your
              progress will be lost.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full sm:justify-between">
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
            <AlertDialogClose>Stay</AlertDialogClose>
            <AlertDialogClose>Discard Changes</AlertDialogClose>
          </div>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
