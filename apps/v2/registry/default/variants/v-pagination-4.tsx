import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="rounded-full" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="rounded-full" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={cn("rounded-full")} href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="rounded-full" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="rounded-full" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
