import { SearchIcon } from "lucide-react";
import { Button } from "@/registry/default/ui//button";
import { Kbd, KbdGroup } from "@/registry/default/ui//kbd";

export function Pattern() {
  return (
    <Button aria-label="Search (Command K)" variant="outline">
      <SearchIcon aria-hidden="true" />
      <span>Search</span>
      <KbdGroup aria-hidden="true">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  );
}
