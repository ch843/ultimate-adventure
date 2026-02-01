import {
  Check as CheckIcon,
  ChevronDown,
  ChevronsLeft as ChevronLeftDouble,
  ChevronLeft,
  ChevronsRight as ChevronRightDouble,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  EyeOff,
  PlusCircle as PlusCircleIcon,
  Settings2,
  X as XCloseIcon,
} from "lucide-react";
import { Column, Row, Table as TanStackTable } from "@tanstack/react-table";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "./tailwind-utils";
import { Skeleton } from "./skeleton";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<TanStackTable<any> | null>(null);

export function useDataTable<TData>(): TanStackTable<TData> {
  const table = useContext(DataTableContext);
  if (!table) {
    throw new Error("useDataTable must be used within a DataTable component");
  }
  return table;
}

interface DataTableProps<TData> {
  table: TanStackTable<TData>;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  onRowClick?: ({ row }: { row: TData }) => void;
  /**
   * If true, the table will have a sticky header and a fixed height.
   */
  maxHeight?: string;
  /**
   * Function to return additional props for each table row.
   */
  getRowProps?: (
    row: Row<TData>,
  ) => React.HTMLAttributes<HTMLTableRowElement> & {
    [key: `data-${string}`]: string | number | boolean;
  };
}

export function DataTable<TData>({
  table,
  className,
  children,
  loading = false,
  onRowClick,
  maxHeight,
  getRowProps,
}: DataTableProps<TData>) {
  const childrenArray = React.Children.toArray(children);
  const toolbar = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === DataTableToolbar,
  );
  const pagination = childrenArray.find(
    (child) =>
      React.isValidElement(child) && child.type === DataTablePagination,
  );

  return (
    <DataTableContext.Provider value={table}>
      <div className={cn("space-y-4", className)}>
        {toolbar && <div>{toolbar}</div>}
        {loading ? (
          <DataTableSkeleton
            className={className}
            columnCount={table.getAllColumns().length}
            filterCount={0}
            maxHeight={maxHeight}
            rowCount={table.getState().pagination.pageSize}
            withPagination={false}
            withViewOptions={false}
          />
        ) : (
          <div
            className={cn(
              "rounded-lg border border-border/60 bg-background overflow-hidden",
              maxHeight ? "relative overflow-y-auto" : "",
            )}
            style={maxHeight ? { height: maxHeight } : undefined}
          >
            <Table noWrapper={!!maxHeight}>
              <TableHeader
                className={
                  maxHeight ? "bg-background sticky top-0 z-10" : undefined
                }
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const customRowProps = getRowProps?.(row) || {};
                    const { className: customClassName, ...otherCustomProps } =
                      customRowProps;

                    return (
                      <TableRow
                        {...otherCustomProps}
                        className={cn(
                          onRowClick
                            ? "cursor-pointer hover:bg-muted focus:bg-muted outline-none"
                            : undefined,
                          customClassName,
                        )}
                        data-state={row.getIsSelected() && "selected"}
                        key={row.id}
                        onClick={
                          onRowClick
                            ? () => onRowClick({ row: row.original })
                            : undefined
                        }
                        onKeyDown={
                          onRowClick
                            ? (e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  onRowClick({ row: row.original });
                                }
                              }
                            : undefined
                        }
                        tabIndex={onRowClick ? 0 : undefined}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center"
                      colSpan={table.getAllColumns().length}
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        {pagination && <div>{pagination}</div>}
      </div>
    </DataTableContext.Provider>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-xs font-medium text-muted-foreground uppercase tracking-wider", className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ml-4 h-8 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground data-[state=open]:bg-transparent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-1 size-3.5" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-1 size-3.5" />
            ) : (
              <ChevronsUpDown className="ml-1 size-3.5 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

import { Badge } from "./badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Separator } from "./separator";

interface DataTablePaginationProps<TData> {
  table?: TanStackTable<TData>;
  firstAndLastPageControls?: boolean;
}

export function DataTablePagination<TData>({
  table: tableProp,
  firstAndLastPageControls = true,
}: DataTablePaginationProps<TData>) {
  const contextTable = useContext(DataTableContext);
  const table = tableProp || contextTable;

  if (!table) {
    throw new Error(
      "DataTablePagination requires either a table prop or to be used within a DataTable component",
    );
  }

  // Check if row selection is enabled by looking for a select column
  const hasSelectionColumn = table
    .getAllColumns()
    .some((column) => column.id === "select");

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
        {hasSelectionColumn && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50, 100, 200, 500].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm text-muted-foreground whitespace-nowrap">
          Page {(table.getState().pagination.pageIndex + 1).toLocaleString()} of{" "}
          {table.getPageCount().toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          {firstAndLastPageControls && (
            <Button
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
              variant="outline"
            >
              <span className="sr-only">Go to first page</span>
              <ChevronLeftDouble />
            </Button>
          )}
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="outline"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="outline"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          {firstAndLastPageControls && (
            <Button
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              variant="outline"
            >
              <span className="sr-only">Go to last page</span>
              <ChevronRightDouble />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface DataTableViewOptionsProps<TData> {
  table?: TanStackTable<TData>;
}

export function DataTableViewOptions<TData>({
  table: tableProp,
}: DataTableViewOptionsProps<TData>) {
  const contextTable = useContext(DataTableContext);
  const table = tableProp || contextTable;

  if (!table) {
    throw new Error(
      "DataTableViewOptions requires either a table prop or to be used within a DataTable component",
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-auto hidden h-9 lg:flex gap-1.5 border-0 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          size="sm"
          variant="outline"
        >
          <Settings2 className="size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                className="capitalize"
                key={column.id}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {(column.columnDef.meta as { label?: string })?.label ||
                  column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DataTableSearchProps<TData> {
  table?: TanStackTable<TData>;
  className?: string;
  debounceMs?: number;
}

export function DataTableSearch<TData>({
  table: tableProp,
  className,
  debounceMs = 300,
  ...props
}: DataTableSearchProps<TData> &
  Omit<React.ComponentProps<"input">, "onChange" | "value">) {
  const contextTable = useContext(DataTableContext);
  const table = tableProp || contextTable;

  if (!table) {
    throw new Error(
      "DataTableSearch requires either a table prop or to be used within a DataTable component",
    );
  }

  const [searchValue, setSearchValue] = useState(
    (table.getState().globalFilter as string) ?? "",
  );
  const [debouncedSearchValue] = useDebounceValue(searchValue, debounceMs);

  // Update the table's global filter when the debounced value changes
  useEffect(() => {
    table.setGlobalFilter(debouncedSearchValue);
  }, [debouncedSearchValue, table]);

  return (
    <Input
      className={cn("h-9 w-[180px] lg:w-[280px] border-0 bg-muted/50", className)}
      onChange={(event) => setSearchValue(event.target.value)}
      placeholder="Search..."
      value={searchValue}
      {...props}
    />
  );
}

interface DataTableFilterResetProps<TData> {
  table?: TanStackTable<TData>;
}

export function DataTableFilterReset<TData>({
  table: tableProp,
}: DataTableFilterResetProps<TData>) {
  const contextTable = useContext(DataTableContext);
  const table = tableProp || contextTable;

  if (!table) {
    throw new Error(
      "DataTableFilterReset requires either a table prop or to be used within a DataTable component",
    );
  }
  const isFiltered = table.getState().columnFilters.length > 0;

  if (!isFiltered) return null;

  return (
    <Button
      onClick={() => table.resetColumnFilters()}
      size="sm"
      variant="ghost"
    >
      Reset
      <XCloseIcon />
    </Button>
  );
}

interface DataTableToolbarProps<TData> {
  table?: TanStackTable<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table: tableProp,
  children,
}: DataTableToolbarProps<TData>) {
  const contextTable = useContext(DataTableContext);
  const table = tableProp || contextTable;

  if (!table) {
    throw new Error(
      "DataTableToolbar requires either a table prop or to be used within a DataTable component",
    );
  }
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 border-dashed" size="sm" variant="outline">
          <PlusCircleIcon />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator className="mx-2 h-4" orientation="vertical" />
              <Badge
                className="rounded-sm px-1 font-normal lg:hidden"
                variant="secondary"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    className="rounded-sm px-1 font-normal"
                    variant="secondary"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        className="rounded-sm px-1 font-normal"
                        key={option.value}
                        variant="secondary"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="text-primary-foreground size-3.5" />
                    </div>
                    {option.icon && (
                      <option.icon className="text-muted-foreground size-4" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => column?.setFilterValue(undefined)}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
  maxHeight?: string;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  filterCount = 0,
  cellWidths = ["auto"],
  withViewOptions = true,
  withPagination = true,
  shrinkZero = false,
  maxHeight,
  className,
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto",
  );

  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)} {...props}>
      {(filterCount > 0 || withViewOptions) && (
        <div className="flex w-full items-center justify-between gap-2 overflow-auto p-1">
          <div className="flex flex-1 items-center gap-2">
            {filterCount > 0
              ? Array.from({ length: filterCount }).map((_, i) => (
                  <Skeleton className="h-7 w-[4.5rem] border-dashed" key={i} />
                ))
              : null}
          </div>
          {withViewOptions ? (
            <Skeleton className="ml-auto hidden h-7 w-[4.5rem] lg:flex" />
          ) : null}
        </div>
      )}
      <div
        className={cn(
          "rounded-lg border border-border/60 overflow-hidden",
          maxHeight ? "relative overflow-y-auto" : "",
        )}
        style={maxHeight ? { height: maxHeight } : undefined}
      >
        <Table noWrapper={!!maxHeight}>
          <TableHeader
            className={
              maxHeight ? "bg-background sticky top-0 z-10" : undefined
            }
          >
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow className="hover:bg-transparent" key={i}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableHead
                    key={j}
                    style={{
                      width: cozyCellWidths[j],
                      minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow className="hover:bg-transparent" key={i}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cozyCellWidths[j],
                      minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {withPagination ? (
        <div className="flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8">
          <Skeleton className="h-7 w-40 shrink-0" />
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-7 w-[4.5rem]" />
            </div>
            <div className="flex items-center justify-center font-medium text-sm">
              <Skeleton className="h-7 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="hidden size-7 lg:block" />
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="hidden size-7 lg:block" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
