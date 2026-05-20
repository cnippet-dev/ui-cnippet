import { BellIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

const notifications = [
  {
    avatar: "https://github.com/shadcn.png",
    id: 1,
    initials: "MW",
    message: "Commented on your pull request: 'looks good to me!'",
    name: "Margaret Welsh",
    time: "2m ago",
    unread: true,
  },
  {
    avatar: "",
    id: 2,
    initials: "BB",
    message: "Assigned you to the task 'Update onboarding flow'.",
    name: "Bora Baloglu",
    time: "18m ago",
    unread: true,
  },
  {
    avatar: "",
    id: 3,
    initials: "SR",
    message: "Mentioned you in a comment: '@you can you take a look?'",
    time: "1h ago",
    unread: false,
  },
  {
    avatar: "",
    id: 4,
    initials: "KN",
    message: "Approved your design review submission.",
    name: "Kai Nakamura",
    time: "3h ago",
    unread: false,
  },
];

export default function Component() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button size="icon" variant="outline" />}>
        <BellIcon className="size-4" />
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader className="flex-row items-center justify-between">
          <DrawerTitle>Notifications</DrawerTitle>
          <Button className="h-auto py-1 text-xs" variant="ghost">
            Mark all as read
          </Button>
        </DrawerHeader>
        <DrawerPanel>
          <ul className="divide-y divide-border">
            {notifications.map((n) => (
              <li className="flex items-start gap-3 py-3" key={n.id}>
                <Avatar className="mt-0.5 size-8 shrink-0">
                  {n.avatar && <AvatarImage alt={n.name} src={n.avatar} />}
                  <AvatarFallback>{n.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm leading-none">{n.name}</p>
                  <p className="mt-0.5 line-clamp-2 text-muted-foreground text-sm">
                    {n.message}
                  </p>
                  <p className="mt-1 text-muted-foreground text-xs">{n.time}</p>
                </div>
                {n.unread && (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                )}
              </li>
            ))}
          </ul>
        </DrawerPanel>
        <DrawerFooter
          className="justify-center sm:justify-center"
          variant="bare"
        >
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
