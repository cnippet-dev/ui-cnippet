import { Trash2Icon } from "lucide-react";
import { Button } from "@/registry/default/ui//button";

export function Pattern() {
  return (
    <Button variant="destructive">
      <Trash2Icon aria-hidden="true" />
      Delete Account
    </Button>
  );
}
