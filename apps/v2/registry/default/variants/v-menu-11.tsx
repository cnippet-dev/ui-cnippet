import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
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
            aria-label="Open account menu"
            className="size-9 rounded-full font-semibold"
            variant="outline"
          />
        }
      >
        JS
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuGroup>
          <MenuGroupLabel>
            <div className="flex flex-col gap-0.5">
              <span>Jane Smith</span>
              <span className="text-xs font-normal text-muted-foreground">
                jane@example.com
              </span>
            </div>
          </MenuGroupLabel>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <UserIcon aria-hidden="true" />
          Profile
        </MenuItem>
        <MenuItem>
          <CreditCardIcon aria-hidden="true" />
          Billing
        </MenuItem>
        <MenuItem>
          <SettingsIcon aria-hidden="true" />
          Settings
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <LogOutIcon aria-hidden="true" />
          Sign out
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
