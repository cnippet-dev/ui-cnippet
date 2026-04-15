import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function DialogPreview() {
  return (
    <div className="relative">
      <div>
        <Skeleton className="flex h-6 w-12 items-center justify-center rounded-sm px-3 transition-opacity duration-300 group-hover:opacity-0">
          <div className="h-1.5 w-full rounded-md bg-neutral-300 dark:bg-neutral-900" />
        </Skeleton>
        <Skeleton className="mt-4 ml-4 flex h-20 w-32 flex-col items-start justify-start space-y-2 rounded-sm p-3 px-3 transition-opacity duration-300 group-hover:opacity-0">
          <div className="h-1.5 w-10 rounded-md bg-neutral-300 dark:bg-neutral-900" />
          <div className="h-1.5 w-20 rounded-md bg-neutral-300 dark:bg-neutral-900" />
          <Skeleton className="mt-auto flex h-4 w-12 items-center justify-center rounded-sm px-3 transition-opacity duration-300 group-hover:opacity-0" />
        </Skeleton>
      </div>

      <div className="absolute inset-0 mx-auto flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Open Dialog
          </DialogTrigger>
          <DialogPopup className="sm:max-w-sm">
            <Form className="contents">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <DialogPanel className="grid gap-4">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Margaret Welsh" type="text" />
                </Field>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input defaultValue="@maggie.welsh" type="text" />
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>
                  Cancel
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </Form>
          </DialogPopup>
        </Dialog>
      </div>
    </div>
  );
}
