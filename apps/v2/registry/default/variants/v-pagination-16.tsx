import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 overflow-hidden rounded-full border">
        <PaginationItem>
          <PaginationLink
            aria-label="Go to previous page"
            className="rounded-none border-0 border-e"
            href="#"
            size="icon"
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <span className="flex items-center px-4 text-muted-foreground text-sm">
            <span className="font-medium text-foreground">3</span>&nbsp;of 12
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-label="Go to next page"
            className="rounded-none border-0 border-s"
            href="#"
            size="icon"
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
