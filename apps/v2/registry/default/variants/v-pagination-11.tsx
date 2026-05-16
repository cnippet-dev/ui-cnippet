import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem className="flex items-center gap-2">
          <span className="whitespace-nowrap text-muted-foreground text-sm">
            Rows per page
          </span>
          <select
            className="w-18 rounded-lg border border-input bg-background px-2 py-1 text-foreground text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24"
            defaultValue="25"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-3">
          <span className="whitespace-nowrap text-muted-foreground text-sm">
            1-25 of 100
          </span>
          <div className="flex gap-1">
            <PaginationLink aria-label="Go to first page" href="#" size="icon">
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
            <PaginationLink
              aria-label="Go to previous page"
              href="#"
              size="icon"
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
            <PaginationLink aria-label="Go to next page" href="#" size="icon">
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
            <PaginationLink aria-label="Go to last page" href="#" size="icon">
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
