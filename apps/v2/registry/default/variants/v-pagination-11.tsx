// title: Rows per page with first/last navigation
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
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

const rows = [10, 25, 50, 100].map((value) => ({ label: String(value), value }));

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem className="flex items-center gap-2">
          <span className="whitespace-nowrap text-muted-foreground text-sm">
            Rows per page
          </span>
          <Select defaultValue={25} items={rows}>
            <SelectTrigger aria-label="Rows per page" className="w-20" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {rows.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-3">
          <span className="whitespace-nowrap text-muted-foreground text-sm">
            1-25 of 100
          </span>
          <div className="flex gap-1">
            <PaginationLink aria-label="Go to first page" href="#" size="icon">
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
            <PaginationLink
              aria-label="Go to previous page"
              href="#"
              size="icon"
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
            <PaginationLink aria-label="Go to next page" href="#" size="icon">
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
            <PaginationLink aria-label="Go to last page" href="#" size="icon">
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
