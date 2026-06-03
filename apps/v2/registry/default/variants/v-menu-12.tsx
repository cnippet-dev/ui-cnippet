import { CopyIcon, DownloadIcon, FilePenIcon, MoveIcon, TrashIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>File actions</MenuTrigger>
      <MenuPopup align="start">
        <MenuGroup>
          <MenuItem>
            <FilePenIcon aria-hidden="true" />
            Rename
            <MenuShortcut>F2</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <CopyIcon aria-hidden="true" />
            Duplicate
            <MenuShortcut>⌘D</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <MoveIcon aria-hidden="true" />
            Move to
          </MenuItem>
          <MenuItem>
            <DownloadIcon aria-hidden="true" />
            Download
            <MenuShortcut>⌘↓</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <TrashIcon aria-hidden="true" />
          Delete
          <MenuShortcut>⌫</MenuShortcut>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
