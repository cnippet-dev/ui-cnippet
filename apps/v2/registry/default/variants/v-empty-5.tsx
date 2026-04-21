import { CloudUploadIcon, PlusIcon } from "lucide-react";
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
      <Empty className="w-full max-w-md border border-dashed py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudUploadIcon />
          </EmptyMedia>
          <EmptyTitle>Upload files</EmptyTitle>
          <EmptyDescription>
            Drag and drop files here, or click to browse.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" variant="outline">
            <PlusIcon data-icon="inline-start" />
            Browse Files
          </Button>
          <EmptyDescription className="text-xs">
            PNG, JPG, SVG up to 10MB
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
