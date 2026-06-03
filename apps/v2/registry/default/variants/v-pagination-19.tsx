import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination className="w-full">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">41–60</span> of{" "}
            <span className="font-medium text-foreground">230</span> results
          </p>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-1">
          <PaginationLink aria-label="Go to previous page" href="#" size="icon">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
          <span className="tabular-nums text-sm text-muted-foreground">
            3 / 12
          </span>
          <PaginationLink aria-label="Go to next page" href="#" size="icon">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
