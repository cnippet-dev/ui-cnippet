import { SearchIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <Button aria-label="Search" size="icon">
      <SearchIcon aria-hidden="true" />
    </Button>
  );
}
