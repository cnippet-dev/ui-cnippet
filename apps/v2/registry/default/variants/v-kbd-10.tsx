import { CopyIcon, DownloadIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export function Pattern() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        Edit document
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>
          <PencilIcon aria-hidden="true" />
          Rename
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>R</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuItem>
          <CopyIcon aria-hidden="true" />
          Duplicate
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>D</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuItem>
          <DownloadIcon aria-hidden="true" />
          Export
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>E</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuItem variant="destructive">
          <TrashIcon aria-hidden="true" />
          Delete
          <Kbd className="ms-auto">⌫</Kbd>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
