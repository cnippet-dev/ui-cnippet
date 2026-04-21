import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui//button";

export function Pattern() {
  return (
    <Button className="group/link-button" variant="link">
      View Documentation
      <ArrowUpRightIcon
        aria-hidden="true"
        className="transition-transform group-hover/link-button:rotate-45"
      />
    </Button>
  );
}
