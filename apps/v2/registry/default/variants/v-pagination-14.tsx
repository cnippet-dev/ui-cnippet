import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <span className="text-muted-foreground text-sm">
            Page <span className="font-medium text-foreground">1</span> of{" "}
            <span className="font-medium text-foreground">10</span>
          </span>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-1">
          <PaginationPrevious href="#" />
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
          <PaginationLink href="#">2</PaginationLink>
          <PaginationLink href="#">3</PaginationLink>
          <PaginationLink href="#">4</PaginationLink>
          <PaginationEllipsis />
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <select className="w-28 rounded-lg border border-input bg-background px-2 py-1 text-foreground text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24">
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
