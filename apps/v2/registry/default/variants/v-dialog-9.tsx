import { EllipsisIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
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
} from "@/registry/default/ui/dialog";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";

export default function Component() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage alt="Margaret Welsh" src="https://github.com/shadcn.png" />
        <AvatarFallback>MW</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm leading-none">Margaret Welsh</p>
        <p className="mt-0.5 truncate text-muted-foreground text-sm">
          margaret@example.com
        </p>
      </div>
      <Dialog>
        <DialogTrigger
          aria-label="Edit user details"
          render={
            <Button className="size-8 shrink-0" size="icon" variant="ghost" />
          }
        >
          <EllipsisIcon className="size-4" />
        </DialogTrigger>
        <DialogPopup className="sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  alt="Margaret Welsh"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Update your personal information.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <Form className="contents">
            <DialogPanel className="grid gap-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Margaret Welsh" type="text" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input defaultValue="margaret@example.com" type="email" />
              </Field>
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Textarea defaultValue="Product designer based in San Francisco." />
              </Field>
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
