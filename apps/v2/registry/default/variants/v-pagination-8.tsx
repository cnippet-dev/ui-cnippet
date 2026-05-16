import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination className="w-full max-w-xs">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationLink aria-label="Go to previous page" href="#" size="icon">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <span className="text-muted-foreground text-xs">
            Page <span className="font-medium text-foreground">1</span> of{" "}
            <span className="font-medium text-foreground">10</span>
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink aria-label="Go to next page" href="#" size="icon">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
