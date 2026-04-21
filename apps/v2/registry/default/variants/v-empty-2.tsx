import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Empty className="bg-muted">
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <Button
            className="text-muted-foreground"
            render={<Link href="#" />}
            variant="link"
          >
            Learn more <ArrowUpRightIcon />
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
