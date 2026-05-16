import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

export function Pattern() {
  return (
    <Card className="p-2">
      <CardContent className="p-0">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationLink
                aria-label="Go to previous page"
                className="h-8 w-8 rounded-full hover:bg-muted"
                href="#"
                size="icon"
              >
                <ChevronLeftIcon className="size-4" />
              </PaginationLink>
            </PaginationItem>

            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={
                    page === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted"
                  }
                  href="#"
                  isActive={page === 1}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            {[10, 11, 12].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationLink
                aria-label="Go to next page"
                className="h-8 w-8 rounded-full hover:bg-muted"
                href="#"
                size="icon"
              >
                <ChevronRightIcon className="size-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
