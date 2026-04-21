import { LogOutIcon } from "lucide-react";
import { Button } from "@/registry/default/ui//button";

export function Pattern() {
  return (
    <Button variant="ghost">
      Logout
      <LogOutIcon aria-hidden="true" />
    </Button>
  );
}
