import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

export default function Component() {
  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        <SlidersHorizontalIcon className="size-4" />
        Filters
      </DrawerTrigger>
      <DrawerPopup showCloseButton variant="straight">
        <DrawerHeader>
          <DrawerTitle>Filter & Sort</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel>
          <DrawerMenu>
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Category</DrawerMenuGroupLabel>
              <DrawerMenuCheckboxItem defaultChecked>
                Design
              </DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem defaultChecked>
                Engineering
              </DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem>Marketing</DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem>Product</DrawerMenuCheckboxItem>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Status</DrawerMenuGroupLabel>
              <DrawerMenuCheckboxItem defaultChecked>
                Active
              </DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem>Archived</DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem>Draft</DrawerMenuCheckboxItem>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Sort by</DrawerMenuGroupLabel>
              <DrawerMenuRadioGroup defaultValue="newest">
                <DrawerMenuRadioItem value="newest">Newest</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="oldest">Oldest</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="name">Name A–Z</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="popular">
                  Most popular
                </DrawerMenuRadioItem>
              </DrawerMenuRadioGroup>
            </DrawerMenuGroup>
          </DrawerMenu>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Reset</DrawerClose>
          <DrawerClose render={<Button />}>Apply filters</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
