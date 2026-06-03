import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationLink className="gap-1.5" href="#">
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            Newer posts
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="gap-1.5" href="#">
            Older posts
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
