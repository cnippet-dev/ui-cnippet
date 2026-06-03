import { PrinterIcon, SaveIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function Particle() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline">
        <SaveIcon aria-hidden="true" />
        Save
        <KbdGroup className="-me-1">
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="outline">
        <PrinterIcon aria-hidden="true" />
        Print
        <KbdGroup className="-me-1">
          <Kbd>⌘</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </Button>
    </div>
  );
}
