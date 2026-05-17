import { CircleAlertIcon } from "lucide-react";
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

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Deactivate Account</Button>}
      />
      <AlertDialogContent>
        <div className="flex items-start gap-3 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/10">
            <CircleAlertIcon className="size-5 text-destructive" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <AlertDialogTitle className="font-semibold text-sm">
              Deactivate your account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              This will disable your account and remove your profile from all
              active searches.
            </AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Keep My Account
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>
            Deactivate Anyway
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
