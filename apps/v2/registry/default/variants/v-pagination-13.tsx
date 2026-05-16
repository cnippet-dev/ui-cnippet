import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Input } from "@/registry/default/ui/input";
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
      <PaginationContent className="w-full justify-between">
        <PaginationItem className="flex items-center gap-1">
          <PaginationLink aria-label="Go to previous page" href="#" size="icon">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
          <PaginationLink href="#">2</PaginationLink>
          <PaginationLink href="#">3</PaginationLink>
          <PaginationLink href="#">4</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink aria-label="Go to next page" href="#" size="icon">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-2">
          <span className="whitespace-nowrap text-muted-foreground text-sm">
            Go to page
          </span>
          <Input
            className="h-9 w-16 text-center"
            defaultValue={1}
            max={10}
            min={1}
            type="number"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
