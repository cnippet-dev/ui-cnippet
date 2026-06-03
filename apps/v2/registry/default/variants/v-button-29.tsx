import { ChevronDownIcon, RocketIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export function Pattern() {
  return (
    <Group aria-label="Deploy options">
      <Button>
        <RocketIcon className="size-4" />
        Deploy
      </Button>
      <GroupSeparator />
      <Menu>
        <MenuTrigger
          render={
            <Button
              aria-label="More deploy options"
              className="px-2"
              size="icon-sm"
            />
          }
        >
          <ChevronDownIcon className="size-4" />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>Deploy to Staging</MenuItem>
          <MenuItem>Deploy to Preview</MenuItem>
          <MenuItem>Deploy with custom env</MenuItem>
          <MenuItem variant="destructive">Force deploy</MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  );
}
