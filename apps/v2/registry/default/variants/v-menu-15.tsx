import { DownloadIcon, ExternalLinkIcon, ShareIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <ShareIcon aria-hidden="true" />
        Share
      </MenuTrigger>
      <MenuPopup align="start">
        <MenuItem>
          <ExternalLinkIcon aria-hidden="true" />
          Copy link
        </MenuItem>
        <MenuSub>
          <MenuSubTrigger>
            <DownloadIcon aria-hidden="true" />
            Export as
          </MenuSubTrigger>
          <MenuSubPopup>
            <MenuItem>PDF</MenuItem>
            <MenuItem>PNG</MenuItem>
            <MenuItem>SVG</MenuItem>
            <MenuSeparator />
            <MenuItem>CSV (data only)</MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  );
}
