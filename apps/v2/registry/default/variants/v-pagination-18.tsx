"use client";

import type React from "react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/registry/default/ui/pagination";

const TOTAL_PAGES = 20;

function getVisiblePages(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function Pattern() {
  const [page, setPage] = useState(5);
  const pages = getVisiblePages(page, TOTAL_PAGES);

  function go(e: React.MouseEvent, p: number) {
    e.preventDefault();
    setPage(p);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-disabled={page === 1}
            aria-label="Go to previous page"
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            href="#"
            onClick={(e) => go(e, page - 1)}
            size="icon"
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        {pages.map((p, idx) =>
          p === "..." ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis placeholders have no stable key
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => go(e, p as number)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationLink
            aria-disabled={page === TOTAL_PAGES}
            aria-label="Go to next page"
            className={page === TOTAL_PAGES ? "pointer-events-none opacity-50" : ""}
            href="#"
            onClick={(e) => go(e, page + 1)}
            size="icon"
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
