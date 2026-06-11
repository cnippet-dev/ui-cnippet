import { FilterXIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FilterXIcon />
          </EmptyMedia>
          <EmptyTitle>No matching results</EmptyTitle>
          <EmptyDescription>
            Your current filters returned no results. Try adjusting or clearing
            them.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button size="sm">Clear filters</Button>
            <Button size="sm" variant="outline">
              Edit filters
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
