import { BellIcon } from "lucide-react";
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
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            aria-label="Notification settings"
            size="icon"
            variant="outline"
          />
        }
      >
        <BellIcon aria-hidden="true" className="size-4" />
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuGroup>
          <MenuGroupLabel>Channels</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked variant="switch">
            Email
          </MenuCheckboxItem>
          <MenuCheckboxItem defaultChecked variant="switch">
            Push
          </MenuCheckboxItem>
          <MenuCheckboxItem variant="switch">SMS</MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Activity</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked>Mentions</MenuCheckboxItem>
          <MenuCheckboxItem defaultChecked>Comments</MenuCheckboxItem>
          <MenuCheckboxItem>Reactions</MenuCheckboxItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
