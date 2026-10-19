// title: With Page Info, Numbered Pages, Ellipsis, and Per-Page Select
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const perPage = [10, 20, 50, 100].map((value) => ({
  label: `${value} / page`,
  value,
}));

export function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="w-full flex-wrap justify-between gap-y-2">
        <PaginationItem>
          <span className="whitespace-nowrap text-muted-foreground text-sm">
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
          <Select defaultValue={10} items={perPage}>
            <SelectTrigger aria-label="Rows per page" className="w-28" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {perPage.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
