import {
  ArchiveIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
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
          <Button aria-label="More options" size="icon" variant="ghost" />
        }
      >
        <EllipsisVerticalIcon aria-hidden="true" className="size-4" />
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem>
          <StarIcon aria-hidden="true" />
          Add to favourites
        </MenuItem>
        <MenuItem>
          <ShareIcon aria-hidden="true" />
          Share
        </MenuItem>
        <MenuItem>
          <ArchiveIcon aria-hidden="true" />
          Archive
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <FlagIcon aria-hidden="true" />
          Report
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
