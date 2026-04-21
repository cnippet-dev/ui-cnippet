import { StarIcon } from "lucide-react";
import { Button } from "@/registry/default/ui//button";

export function Pattern() {
  return (
    <Button className="pe-0" variant="outline">
      <StarIcon aria-hidden="true" />
      Star
      <span className="relative ms-1 px-2 font-medium text-muted-foreground text-xs before:absolute before:inset-0 before:left-0 before:w-px before:bg-border">
        589
      </span>
    </Button>
  );
}
