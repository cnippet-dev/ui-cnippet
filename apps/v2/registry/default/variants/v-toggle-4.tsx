import { BoldIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Toggle aria-label="Small toggle" size="sm" variant="outline">
          Toggle
        </Toggle>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <BoldIcon />
        </Button>
        <Toggle aria-label="Toggle bold icon" variant="outline">
          <BoldIcon />
        </Toggle>
      </div>
    </div>
  );
}
