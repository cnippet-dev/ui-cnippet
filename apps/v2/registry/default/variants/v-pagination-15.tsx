"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";

const TOTAL = 48;
const PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(TOTAL / PER_PAGE);

function getPageWindow(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function Pattern() {
  const [page, setPage] = useState(1);
  const window_ = getPageWindow(page, TOTAL_PAGES);
  const start = (page - 1) * PER_PAGE + 1;
  const end = Math.min(page * PER_PAGE, TOTAL);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-muted-foreground text-xs">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-foreground">{TOTAL}</span> results
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {window_.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p as number);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              aria-disabled={page === TOTAL_PAGES}
              className={
                page === TOTAL_PAGES ? "pointer-events-none opacity-50" : ""
              }
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(TOTAL_PAGES, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
