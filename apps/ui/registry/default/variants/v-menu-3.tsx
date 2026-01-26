import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem render={<Link href="/docs" />}>Docs</MenuItem>
        <MenuItem render={<Link href="/particles" />}>Particles</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
