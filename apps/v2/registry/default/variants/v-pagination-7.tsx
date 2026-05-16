import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
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
          <PaginationLink className="gap-2" href="#" size="default">
            <ArrowLeftIcon className="size-4" />
            Previous
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="gap-2" href="#" size="default">
            Next
            <ArrowRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
