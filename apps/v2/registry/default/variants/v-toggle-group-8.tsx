import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup defaultValue={["light"]} variant="outline">
        <ToggleGroupItem aria-label="Light theme" value="light">
          <SunIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Dark theme" value="dark">
          <MoonIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="System theme" value="system">
          <MonitorIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
