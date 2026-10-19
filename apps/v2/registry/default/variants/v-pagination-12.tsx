// title: With Page Select Dropdown And First/Last Navigation
"use client";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const TOTAL_PAGES = 10;

const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  label: `Page ${i + 1}`,
  value: i + 1,
}));

export function Pattern() {
  const [page, setPage] = useState(1);
  const isFirst = page === 1;
  const isLast = page === TOTAL_PAGES;

  const go = (next: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setPage(Math.min(Math.max(next, 1), TOTAL_PAGES));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isFirst}
            aria-label="Go to first page"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href="#"
            onClick={go(1)}
            size="icon"
          >
            <ChevronFirstIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isFirst}
            aria-label="Go to previous page"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href="#"
            onClick={go(page - 1)}
            size="icon"
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Select
            items={pages}
            onValueChange={(value) => setPage(value as number)}
            value={page}
          >
            <SelectTrigger aria-label="Select page" className="w-28" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {pages.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isLast}
            aria-label="Go to next page"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href="#"
            onClick={go(page + 1)}
            size="icon"
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isLast}
            aria-label="Go to last page"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href="#"
            onClick={go(TOTAL_PAGES)}
            size="icon"
          >
            <ChevronLastIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
