"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
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
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Component() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <Drawer position="bottom">
      <DrawerTrigger render={<Button variant="outline" />}>
        <PencilIcon className="size-4" />
        Edit profile
      </DrawerTrigger>
      <DrawerPopup showBar variant="inset">
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Field className="flex-1">
                <FieldLabel>First name</FieldLabel>
                <Input defaultValue="Alex" placeholder="First name" />
              </Field>
              <Field className="flex-1">
                <FieldLabel>Last name</FieldLabel>
                <Input defaultValue="Morgan" placeholder="Last name" />
              </Field>
            </div>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                defaultValue="alex@example.com"
                placeholder="Email"
                type="email"
              />
              <FieldDescription>
                Used for notifications and sign-in.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Input
                defaultValue="Product designer at Acme Inc."
                placeholder="Short bio"
              />
            </Field>
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Button className="flex-1" onClick={handleSave}>
            {saved ? "Saved!" : "Save changes"}
          </Button>
          <DrawerClose render={<Button className="flex-1" variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
