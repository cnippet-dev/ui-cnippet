import { ShieldQuestionMarkIcon } from "lucide-react";
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
      <AlertDialogTrigger render={<Button variant="outline">Logout</Button>} />
      <AlertDialogContent className="gap-0 overflow-hidden p-0 sm:max-w-sm">
        <div className="flex flex-col items-center justify-center gap-2 p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-violet-50 text-violet-500 dark:bg-violet-950 dark:text-violet-400">
            <ShieldQuestionMarkIcon className="size-6" />
          </div>
          <AlertDialogTitle className="text-center font-semibold text-base">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-0 text-center font-medium text-sm">
            You can always log in later to your account.
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter className="grid w-full flex-none grid-cols-2 gap-0 divide-x border-t py-0">
          <AlertDialogClose
            render={
              <Button
                className="h-12 flex-1 rounded-none border-0 border-border border-r p-0"
                variant="ghost"
              />
            }
          >
            No
          </AlertDialogClose>
          <AlertDialogClose
            render={
              <Button
                className="h-12 flex-1 rounded-none border-0 p-0"
                variant="ghost"
              />
            }
          >
            Yes, Logout
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
