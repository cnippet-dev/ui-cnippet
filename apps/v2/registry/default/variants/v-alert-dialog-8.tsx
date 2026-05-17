import { ShieldAlertIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">System Update</Button>}
      />
      <AlertDialogContent className="gap-0 p-0 sm:max-w-sm">
        <div className="mx-auto flex flex-col items-center justify-center gap-2 p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-info/10 text-info dark:bg-info/20">
            <ShieldAlertIcon className="size-6" />
          </div>
          <AlertDialogTitle className="text-center">
            System Update Available!
          </AlertDialogTitle>
          <Badge variant="success">Release v28.1.0 (2026-01-12)</Badge>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-b-2xl bg-muted/60 pt-6">
          <AlertDialogDescription className="px-6 text-center text-muted-foreground">
            A new version of the application is ready. Restarting now will apply
            the latest security patches and features.
          </AlertDialogDescription>
          <AlertDialogFooter className="flex w-full gap-4 sm:items-center sm:justify-center">
            <AlertDialogClose render={<Button variant="ghost" />}>
              Remind Me Later
            </AlertDialogClose>
            <AlertDialogClose render={<Button />}>Update Now</AlertDialogClose>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
