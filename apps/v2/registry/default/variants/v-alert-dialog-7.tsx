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

export function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">View Confirmation</Button>}
      />
      <AlertDialogContent className="gap-8 p-0 sm:max-w-sm">
        <div className="mx-auto flex flex-col items-center justify-center gap-2 p-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-info/10 text-info dark:bg-info/20">
            <CheckIcon className="size-5" />
          </div>
          <AlertDialogTitle className="text-center">
            Success! Your e-ticket is registered.
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-xs text-center">
            Please check your email for confirmation and further instructions
            about the event.
          </AlertDialogDescription>
        </div>

        <div className="m-4 grid gap-4 rounded-xl bg-muted/60 p-4">
          {[
            ["Order Number", "GBD99763JS"],
            ["Order Date", "7 September 2024"],
            ["Event Name", "Groove Beats Day Fest"],
            ["Event Date", "20/09/2024"],
            ["Register Date", "20/09/2024 | 09 PM"],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between text-sm"
              key={label}
            >
              <span className="font-medium text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogClose
            render={<Button className="w-full sm:w-full" size="lg" />}
          >
            Back to Home
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
