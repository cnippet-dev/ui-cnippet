import { BellIcon } from "lucide-react";
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
        render={<Button variant="outline">Subscription Expiring</Button>}
      />
      <AlertDialogContent className="gap-0 p-0 sm:max-w-sm">
        <div className="mx-auto flex flex-col items-center justify-center gap-2 p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive dark:bg-destructive/20">
            <BellIcon className="size-6" />
          </div>
          <AlertDialogTitle className="text-center">
            Subscription Expiring Soon
          </AlertDialogTitle>
          <Badge className="font-normal" variant="destructive">
            Expires in 2 days
          </Badge>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-b-2xl bg-muted/60 pt-6">
          <AlertDialogDescription className="px-6 text-center text-muted-foreground">
            Your current plan will expire in 2 days. Update your payment method
            now to ensure uninterrupted access to your Pro features.
          </AlertDialogDescription>
          <AlertDialogFooter className="w-full gap-4">
            <AlertDialogClose render={<Button variant="ghost" />}>
              Remind Me Later
            </AlertDialogClose>
            <AlertDialogClose render={<Button />}>
              Update Payment
            </AlertDialogClose>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
