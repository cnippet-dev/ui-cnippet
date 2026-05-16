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
      <PaginationContent>
        <PaginationItem>
          <PaginationLink aria-label="Go to first page" href="#" size="icon">
            <ChevronFirstIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink aria-label="Go to previous page" href="#" size="icon">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <select
            className="w-26 rounded-lg border border-input bg-background px-2 py-1 text-foreground text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24"
            defaultValue="1"
          >
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="4">Page 4</option>
            <option value="5">Page 5</option>
            <option value="6">Page 6</option>
            <option value="7">Page 7</option>
            <option value="8">Page 8</option>
            <option value="9">Page 9</option>
            <option value="10">Page 10</option>
          </select>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink aria-label="Go to next page" href="#" size="icon">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink aria-label="Go to last page" href="#" size="icon">
            <ChevronLastIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
