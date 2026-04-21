import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MenuIcon,
} from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup defaultValue={["left"]}>
        <ToggleGroupItem aria-label="Align left" value="left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align center" value="center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align right" value="right">
          <AlignRightIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Justify" value="justify">
          <MenuIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
