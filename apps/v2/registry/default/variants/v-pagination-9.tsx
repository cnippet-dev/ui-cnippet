import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Pagination className="w-full max-w-xs">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <span className="text-muted-foreground text-xs">
            Page <span className="font-medium text-foreground">1</span> of{" "}
            <span className="font-medium text-foreground">10</span>
          </span>
        </PaginationItem>
        <PaginationItem className="flex gap-1">
          <PaginationPrevious href="#" />
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
