"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [email, setEmail] = useState(true);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        Notification settings
      </MenuTrigger>
      <MenuPopup align="start">
        <MenuGroup>
          <MenuGroupLabel>Channels</MenuGroupLabel>
          <MenuCheckboxItem
            checked={desktop}
            onCheckedChange={setDesktop}
            variant="switch"
          >
            Desktop
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={mobile}
            onCheckedChange={setMobile}
            variant="switch"
          >
            Mobile push
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={email}
            onCheckedChange={setEmail}
            variant="switch"
          >
            Email digest
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Activity</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked variant="switch">
            Mentions
          </MenuCheckboxItem>
          <MenuCheckboxItem variant="switch">Comments</MenuCheckboxItem>
          <MenuCheckboxItem defaultChecked variant="switch">
            Assignments
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
