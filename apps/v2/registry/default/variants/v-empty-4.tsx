import { FolderIcon, PlusIcon } from "lucide-react";
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
    <div className="flex items-center justify-center">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>Nothing to see here</EmptyTitle>
          <EmptyDescription>
            No posts have been created yet. Get started by{" "}
            <a href="#">creating your first post</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            <PlusIcon data-icon="inline-start" />
            New Post
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
