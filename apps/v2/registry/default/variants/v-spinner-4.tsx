import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Spinner } from "@/registry/default/ui/spinner";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Empty className="min-h-75 w-full max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner className="size-4" />
          </EmptyMedia>
          <EmptyTitle>Loading projects</EmptyTitle>
          <EmptyDescription>
            Please wait while we fetch your project data. This should only take
            a moment.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button disabled variant="outline">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
