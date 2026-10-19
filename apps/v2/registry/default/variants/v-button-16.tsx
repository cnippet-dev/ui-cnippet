// title: Outline button with an icon on the left
import { PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <Button variant="outline">
      <PlusIcon aria-hidden="true" />
      Add Item
    </Button>
  );
}
