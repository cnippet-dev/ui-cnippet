//biome-ignore-all lint/suspicious/noArrayIndexKey: <>

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 overflow-hidden rounded-md border">
        <PaginationItem>
          <PaginationLink
            aria-label="Go to previous page"
            className="rounded-none border-0 border-border border-e"
            href="#"
            size="icon"
          >
            <ChevronLeftIcon />
          </PaginationLink>
        </PaginationItem>

        {
          /* Page numbers */
          Array.from({ length: 4 }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="rounded-none border-0 border-border border-e data-[active=true]:bg-muted"
                href="#"
                isActive={index === 2}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        }

        <PaginationItem className="border-0 border-border border-e">
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            aria-label="Go to next page"
            className="rounded-none border-0"
            href="#"
            size="icon"
          >
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
