// title: Showcase: numbered, icon-only and page info
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";

export default function Particle() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              aria-label="Go to previous page"
              href="#"
              size="icon"
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === 3}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink aria-label="Go to next page" href="#" size="icon">
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Pagination>
        <PaginationContent className="w-full justify-between gap-6">
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem className="text-muted-foreground text-sm">
            Page 4 of 12
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
