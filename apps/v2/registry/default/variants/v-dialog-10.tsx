import { UserPlusIcon } from "lucide-react";
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
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const members = [
  {
    avatar: "https://github.com/shadcn.png",
    email: "margaret@example.com",
    id: 1,
    initials: "MW",
    name: "Margaret Welsh",
    role: "Owner",
  },
  {
    avatar: "",
    email: "bora@example.com",
    id: 2,
    initials: "BB",
    name: "Bora Baloglu",
    role: "Editor",
  },
  {
    avatar: "",
    email: "sofia@example.com",
    id: 3,
    initials: "SR",
    name: "Sofia Reyes",
    role: "Viewer",
  },
];

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        <UserPlusIcon className="size-4" />
        Invite members
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to project</DialogTitle>
          <DialogDescription>
            Invite teammates by email and assign their access level.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-5">
          <div className="flex gap-2">
            <Field className="min-w-0 flex-1">
              <FieldLabel className="sr-only">Email address</FieldLabel>
              <Input placeholder="colleague@example.com" type="email" />
            </Field>
            <Select defaultValue="viewer">
              <SelectTrigger className="w-28 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectPopup>
            </Select>
          </div>
          <div className="grid gap-1">
            <p className="px-0.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Members with access
            </p>
            <ul className="divide-y divide-border">
              {members.map((member) => (
                <li className="flex items-center gap-3 py-2.5" key={member.id}>
                  <Avatar className="size-8 shrink-0">
                    {member.avatar && (
                      <AvatarImage alt={member.name} src={member.avatar} />
                    )}
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm leading-none">
                      {member.name}
                    </p>
                    <p className="mt-0.5 truncate text-muted-foreground text-xs">
                      {member.email}
                    </p>
                  </div>
                  <span className="shrink-0 text-muted-foreground text-xs">
                    {member.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
