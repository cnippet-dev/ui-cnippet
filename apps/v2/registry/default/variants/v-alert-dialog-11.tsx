import { FileIcon } from "lucide-react";
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
        render={<Button variant="outline">Upload File</Button>}
      />
      <AlertDialogContent className="sm:max-w-sm">
        <div className="flex items-start gap-3 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
            <FileIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <AlertDialogTitle className="font-semibold text-sm">
              File already exists
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              <strong className="text-foreground">design-system-v2.fig</strong>{" "}
              (48 MB) already exists in{" "}
              <span className="font-mono text-xs">/Projects/Design</span>. Do
              you want to replace it?
            </AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Keep Both
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant="outline" />}>
            Skip
          </AlertDialogClose>
          <AlertDialogClose render={<Button />}>Replace</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
