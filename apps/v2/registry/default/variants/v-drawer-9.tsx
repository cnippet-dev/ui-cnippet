"use client";

import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

export default function Component() {
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-medium text-sm">Account deleted.</p>
        <Button onClick={() => setDeleted(false)} size="sm" variant="outline">
          Undo
        </Button>
      </div>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="destructive" />}>
        <TrashIcon className="size-4" />
        Delete account
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Delete account?</DrawerTitle>
          <DrawerDescription>
            This will permanently delete your account and remove all associated
            data. This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            className="w-full"
            onClick={() => setDeleted(true)}
            variant="destructive"
          >
            Yes, delete my account
          </Button>
          <DrawerClose render={<Button className="w-full" variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
