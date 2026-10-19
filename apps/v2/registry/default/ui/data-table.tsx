"use client";

import {
  type Column,
  FlexRender,
  type ReactTable,
  type Row,
  type RowData,
  Subscribe,
  type Table,
  type TableFeatures,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
  type TableVariant,
} from "@/registry/default/ui/table";

// TanStack Table v9 only installs a feature's APIs when that feature is
// registered with `tableFeatures()`. Each part below requires the features it
// uses at the call site, then narrows the table once internally, because
// feature-gated methods can't be resolved on a still-generic table type.
type FeatureKey = keyof TableFeatures;
type WithFeatures<K extends FeatureKey> = Pick<Required<TableFeatures>, K>;
type AnyTable<TData extends RowData> = Table<WithFeatures<FeatureKey>, TData>;

// State is read through `Subscribe` rather than `table.state`, so every part
// stays current even when the caller narrows `useTable`'s selector, and the
// React Compiler can't memoize away a read hidden behind a table method.

function hasFeature(target: object, method: string): boolean {
  return method in target;
}

function ariaSort<TData extends RowData>(
  column: Column<WithFeatures<FeatureKey>, TData, unknown>,
): React.AriaAttributes["aria-sort"] {
  if (!hasFeature(column, "getIsSorted") || !column.getCanSort()) {
    return undefined;
  }
  const sorted = column.getIsSorted();
  if (sorted === "asc") return "ascending";
  if (sorted === "desc") return "descending";
  return "none";
}

export interface DataTableProps<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TSelected,
> extends Omit<React.ComponentProps<"table">, "children"> {
  table: ReactTable<TFeatures, TData, TSelected>;
  /** Shown in a full-width row when there are no rows to display. */
  emptyMessage?: React.ReactNode;
  variant?: TableVariant;
}

export function DataTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TSelected,
>({
  table: tableProp,
  emptyMessage = "No results.",
  ...props
}: DataTableProps<TFeatures, TData, TSelected>): React.ReactElement {
  "use no memo";
  const table = tableProp as unknown as ReactTable<
    WithFeatures<FeatureKey>,
    TData
  >;

  return (
    <table.Subscribe selector={(state) => state}>
      {() => {
        const rows = table.getRowModel().rows;
        const leafColumns = hasFeature(table, "getVisibleLeafColumns")
          ? table.getVisibleLeafColumns()
          : table.getAllLeafColumns();

        return (
          <TableRoot data-slot="data-table" {...props}>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead
                      aria-sort={ariaSort(header.column)}
                      colSpan={header.colSpan}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    data-state={
                      hasFeature(row, "getIsSelected") && row.getIsSelected()
                        ? "selected"
                        : undefined
                    }
                    key={row.id}
                  >
                    {(hasFeature(row, "getVisibleCells")
                      ? row.getVisibleCells()
                      : row.getAllCells()
                    ).map((cell) => (
                      <TableCell key={cell.id}>
                        <FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center text-muted-foreground"
                    colSpan={leafColumns.length}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableRoot>
        );
      }}
    </table.Subscribe>
  );
}

export function DataTableColumnHeader<
  TFeatures extends TableFeatures & WithFeatures<"rowSortingFeature">,
  TData extends RowData,
  TValue,
>({
  column: columnProp,
  title,
  className,
}: {
  column: Column<TFeatures, TData, TValue>;
  title: React.ReactNode;
  className?: string;
}): React.ReactElement {
  const column = columnProp as unknown as Column<
    WithFeatures<"rowSortingFeature">,
    TData,
    TValue
  >;

  if (!column.getCanSort()) {
    return <span className={className}>{title}</span>;
  }

  return (
    <Subscribe
      selector={() => column.getIsSorted()}
      source={column.table.atoms.sorting}
    >
      {(sorted) => (
        <Button
          className={cn(
            "-ms-2 h-7 gap-1 px-2 font-medium text-muted-foreground hover:text-foreground data-[sorted]:text-foreground",
            className,
          )}
          data-sorted={sorted || undefined}
          onClick={column.getToggleSortingHandler()}
          size="sm"
          variant="ghost"
        >
          {title}
          {sorted === "asc" ? (
            <ArrowUpIcon aria-hidden="true" />
          ) : sorted === "desc" ? (
            <ArrowDownIcon aria-hidden="true" />
          ) : (
            <ChevronsUpDownIcon aria-hidden="true" className="opacity-60" />
          )}
        </Button>
      )}
    </Subscribe>
  );
}

export function DataTableSelectAll<
  TFeatures extends TableFeatures & WithFeatures<"rowSelectionFeature">,
  TData extends RowData,
>({
  table: tableProp,
  label = "Select all rows on this page",
}: {
  table: Table<TFeatures, TData>;
  label?: string;
}): React.ReactElement {
  const table = tableProp as unknown as Table<
    WithFeatures<"rowSelectionFeature">,
    TData
  >;

  return (
    <Subscribe
      selector={() => ({
        all: table.getIsAllPageRowsSelected(),
        some: table.getIsSomePageRowsSelected(),
      })}
      source={table.store}
    >
      {({ all, some }) => (
        <Checkbox
          aria-label={label}
          checked={all}
          className="translate-y-px"
          // v9: "some" includes "all", so derive indeterminate explicitly.
          indeterminate={some && !all}
          onCheckedChange={(checked) =>
            table.toggleAllPageRowsSelected(checked)
          }
        />
      )}
    </Subscribe>
  );
}

export function DataTableRowCheckbox<
  TFeatures extends TableFeatures & WithFeatures<"rowSelectionFeature">,
  TData extends RowData,
>({
  row: rowProp,
  label = "Select row",
}: {
  row: Row<TFeatures, TData>;
  label?: string;
}): React.ReactElement {
  const row = rowProp as unknown as Row<
    WithFeatures<"rowSelectionFeature">,
    TData
  >;

  return (
    <Subscribe
      selector={() => row.getIsSelected()}
      source={row.table.atoms.rowSelection}
    >
      {(selected) => (
        <Checkbox
          aria-label={label}
          checked={selected}
          className="translate-y-px"
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked, details) =>
            // The handler reads `target.checked` and Shift for range selection.
            row.getToggleSelectedHandler()({
              shiftKey: (details.event as MouseEvent | undefined)?.shiftKey,
              target: { checked },
            })
          }
          // Shift-click range selection would otherwise also select the text
          // between the two clicks.
          onMouseDown={(event) => {
            if (event.shiftKey) event.preventDefault();
          }}
        />
      )}
    </Subscribe>
  );
}

export function DataTableSearch<
  TFeatures extends TableFeatures & WithFeatures<"globalFilteringFeature">,
  TData extends RowData,
>({
  table: tableProp,
  placeholder = "Search…",
  className,
}: {
  table: Table<TFeatures, TData>;
  placeholder?: string;
  className?: string;
}): React.ReactElement {
  const table = tableProp as unknown as Table<
    WithFeatures<"globalFilteringFeature">,
    TData
  >;

  return (
    <Subscribe source={table.atoms.globalFilter}>
      {(globalFilter) => (
        <InputGroup className={cn("w-full sm:max-w-64", className)}>
          <InputGroupInput
            aria-label={placeholder}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={placeholder}
            size="sm"
            type="search"
            value={(globalFilter as string | undefined) ?? ""}
          />
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      )}
    </Subscribe>
  );
}

export interface DataTableFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Multi-select filter for one column. Give the column
 * `filterFn: "arrHas"` (registered from `filterFn_arrHas`), which keeps rows
 * whose value equals any selected option. (`arrIncludesSome` expects the
 * row's value itself to be an array.)
 * Counts appear when the column faceting feature is registered.
 */
export function DataTableFacetedFilter<
  TFeatures extends TableFeatures & WithFeatures<"columnFilteringFeature">,
  TData extends RowData,
  TValue,
>({
  column: columnProp,
  title,
  options,
}: {
  column: Column<TFeatures, TData, TValue>;
  title: string;
  options: DataTableFilterOption[];
}): React.ReactElement {
  const column = columnProp as unknown as Column<
    WithFeatures<"columnFilteringFeature" | "columnFacetingFeature">,
    TData,
    TValue
  >;
  const facets = hasFeature(column, "getFacetedUniqueValues")
    ? column.getFacetedUniqueValues()
    : undefined;

  return (
    <Subscribe
      selector={() => (column.getFilterValue() as string[] | undefined) ?? []}
      source={column.table.atoms.columnFilters}
    >
      {(selected) => {
        const toggle = (value: string, checked: boolean) => {
          const next = checked
            ? [...selected, value]
            : selected.filter((v) => v !== value);
          column.setFilterValue(next.length > 0 ? next : undefined);
        };

        return (
          <Menu>
            <MenuTrigger
              render={
                <Button className="border-dashed" size="sm" variant="outline" />
              }
            >
              <PlusCircleIcon aria-hidden="true" />
              {title}
              {selected.length > 0 && (
                <Badge className="ms-0.5" size="sm" variant="secondary">
                  {selected.length > 2
                    ? `${selected.length} selected`
                    : options
                        .filter((o) => selected.includes(o.value))
                        .map((o) => o.label)
                        .join(", ")}
                </Badge>
              )}
            </MenuTrigger>
            <MenuPopup align="start" className="min-w-48">
              <MenuGroup>
                <MenuGroupLabel>{title}</MenuGroupLabel>
                {options.map((option) => (
                  <MenuCheckboxItem
                    checked={selected.includes(option.value)}
                    key={option.value}
                    onCheckedChange={(checked) => toggle(option.value, checked)}
                  >
                    <span className="flex w-full items-center gap-2">
                      {option.icon && (
                        <option.icon className="size-4 shrink-0 text-muted-foreground" />
                      )}
                      {option.label}
                      {facets && (
                        <span className="ms-auto ps-3 font-mono text-muted-foreground text-xs tabular-nums">
                          {facets.get(option.value) ?? 0}
                        </span>
                      )}
                    </span>
                  </MenuCheckboxItem>
                ))}
              </MenuGroup>
              {selected.length > 0 && (
                <>
                  <MenuSeparator />
                  <MenuItem onClick={() => column.setFilterValue(undefined)}>
                    Clear filter
                  </MenuItem>
                </>
              )}
            </MenuPopup>
          </Menu>
        );
      }}
    </Subscribe>
  );
}

export function DataTableViewOptions<
  TFeatures extends TableFeatures & WithFeatures<"columnVisibilityFeature">,
  TData extends RowData,
>({
  table: tableProp,
}: {
  table: Table<TFeatures, TData>;
}): React.ReactElement {
  const table = tableProp as unknown as Table<
    WithFeatures<"columnVisibilityFeature">,
    TData
  >;

  return (
    <Subscribe source={table.atoms.columnVisibility}>
      {() => (
        <Menu>
          <MenuTrigger
            render={<Button className="ms-auto" size="sm" variant="outline" />}
          >
            <Settings2Icon aria-hidden="true" />
            View
          </MenuTrigger>
          <MenuPopup align="end" className="min-w-44">
            <MenuGroup>
              <MenuGroupLabel>Toggle columns</MenuGroupLabel>
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <MenuCheckboxItem
                    checked={column.getIsVisible()}
                    key={column.id}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked)
                    }
                  >
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </MenuCheckboxItem>
                ))}
            </MenuGroup>
          </MenuPopup>
        </Menu>
      )}
    </Subscribe>
  );
}

export function DataTablePagination<
  TFeatures extends TableFeatures & WithFeatures<"rowPaginationFeature">,
  TData extends RowData,
>({
  table: tableProp,
  pageSizeOptions = [10, 20, 50],
  className,
}: {
  table: Table<TFeatures, TData>;
  pageSizeOptions?: number[];
  className?: string;
}): React.ReactElement {
  const table = tableProp as unknown as AnyTable<TData>;
  const canSelect = hasFeature(table, "getFilteredSelectedRowModel");

  return (
    <Subscribe
      selector={(state) => ({
        filteredCount: table.getPrePaginatedRowModel().rows.length,
        pageCount: Math.max(table.getPageCount(), 1),
        pageIndex: state.pagination.pageIndex,
        pageSize: state.pagination.pageSize,
        selectedCount: canSelect
          ? table.getFilteredSelectedRowModel().rows.length
          : 0,
      })}
      source={table.store}
    >
      {({ filteredCount, pageCount, pageIndex, pageSize, selectedCount }) => (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted-foreground text-sm",
            className,
          )}
          data-slot="data-table-pagination"
        >
          <p aria-live="polite">
            {canSelect && selectedCount > 0
              ? `${selectedCount} of ${filteredCount} row(s) selected`
              : `${filteredCount} row(s)`}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap">Rows per page</span>
              <Select
                items={pageSizeOptions.map((size) => ({
                  label: String(size),
                  value: size,
                }))}
                onValueChange={(value) => table.setPageSize(Number(value))}
                value={pageSize}
              >
                <SelectTrigger
                  aria-label="Rows per page"
                  className="w-18 min-w-0"
                  size="sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </div>
            <span className="whitespace-nowrap tabular-nums">
              Page {pageIndex + 1} of {pageCount}
            </span>
            <div className="flex items-center gap-1">
              <Button
                aria-label="First page"
                className="hidden sm:inline-flex"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsLeftIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Previous page"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronLeftIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Next page"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronRightIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Last page"
                className="hidden sm:inline-flex"
                disabled={!table.getCanNextPage()}
                onClick={() => table.lastPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsRightIcon aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Subscribe>
  );
}
