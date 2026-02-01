import {
  Calendar,
  Check as CheckIcon,
  Filter,
  PlusCircle as PlusCircleIcon,
  Text,
  X as XCloseIcon,
  type LucideIcon,
} from "lucide-react";
import { Column, Table as TanStackTable } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { cn } from "./tailwind-utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { DataTableContext } from "./data-table";

// ============================================================================
// TYPES
// ============================================================================

export type FilterType = "text" | "select" | "date";

export interface FilterDefinition {
  id: string;
  label: string;
  type: FilterType;
  icon?: LucideIcon;
  options?: { label: string; value: string }[]; // For select filters
}

// ============================================================================
// CONTEXT HOOK
// ============================================================================

function useDataTableContext<TData>(): TanStackTable<TData> | null {
  return useContext(DataTableContext);
}

// ============================================================================
// FILTER CHIP - Styled like the screenshot
// ============================================================================

interface DataTableFilterChipProps {
  label: string;
  value: string;
  operator?: string;
  onRemove: () => void;
  onClick?: () => void;
}

export function DataTableFilterChip({
  label,
  value,
  operator = "include",
  onRemove,
  onClick,
}: DataTableFilterChipProps) {
  return (
    <div className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 text-sm">
      <button
        className="flex items-center gap-1.5 hover:text-foreground"
        onClick={onClick}
        type="button"
      >
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{operator}</span>
        <span className="text-primary font-medium">{value}</span>
      </button>
      <button
        className="ml-0.5 text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        type="button"
      >
        <XCloseIcon className="size-3.5" />
      </button>
    </div>
  );
}

// ============================================================================
// TEXT FILTER
// ============================================================================

interface DataTableTextFilterProps<TData> {
  column: Column<TData, unknown>;
  label: string;
  icon?: LucideIcon;
  onClose?: () => void;
}

export function DataTableTextFilter<TData>({
  column,
  label,
  icon: Icon = Text,
  onClose,
}: DataTableTextFilterProps<TData>) {
  const [localValue, setLocalValue] = useState(
    (column.getFilterValue() as string) ?? "",
  );

  const handleApply = () => {
    column.setFilterValue(localValue || undefined);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 w-[250px]">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="size-4 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <Input
        autoFocus
        className="h-9"
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Filter by ${label.toLowerCase()}...`}
        value={localValue}
      />
      <div className="flex justify-end gap-2 pt-1">
        <Button
          onClick={() => {
            setLocalValue("");
            column.setFilterValue(undefined);
            onClose?.();
          }}
          size="sm"
          variant="ghost"
        >
          Clear
        </Button>
        <Button onClick={handleApply} size="sm">
          Apply
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// SELECT FILTER
// ============================================================================

interface DataTableSelectFilterProps<TData> {
  column: Column<TData, unknown>;
  label: string;
  icon?: LucideIcon;
  options: { label: string; value: string }[];
  onClose?: () => void;
}

export function DataTableSelectFilter<TData>({
  column,
  label,
  icon: Icon = Filter,
  options,
  onClose,
}: DataTableSelectFilterProps<TData>) {
  const selectedValues = new Set(
    column.getFilterValue() as string[] | undefined,
  );

  const handleSelect = (value: string) => {
    const newValues = new Set(selectedValues);
    if (newValues.has(value)) {
      newValues.delete(value);
    } else {
      newValues.add(value);
    }
    column.setFilterValue(newValues.size ? Array.from(newValues) : undefined);
  };

  return (
    <div className="flex flex-col gap-2 p-3 w-[250px]">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="size-4 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <Command className="border-0">
        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
        <CommandList className="max-h-[200px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div
                    className={cn(
                      "flex size-4 items-center justify-center rounded border mr-2",
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-input [&_svg]:invisible",
                    )}
                  >
                    <CheckIcon className="size-3" />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button
          onClick={() => {
            column.setFilterValue(undefined);
            onClose?.();
          }}
          size="sm"
          variant="ghost"
        >
          Clear
        </Button>
        <Button onClick={onClose} size="sm">
          Done
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// DATE FILTER
// ============================================================================

interface DataTableDateFilterProps<TData> {
  column: Column<TData, unknown>;
  label: string;
  onClose?: () => void;
}

export function DataTableDateFilter<TData>({
  column,
  label,
  onClose,
}: DataTableDateFilterProps<TData>) {
  const currentValue = column.getFilterValue() as
    | { from?: string; to?: string }
    | undefined;
  const [fromDate, setFromDate] = useState(currentValue?.from ?? "");
  const [toDate, setToDate] = useState(currentValue?.to ?? "");

  const handleApply = () => {
    if (fromDate || toDate) {
      column.setFilterValue({
        from: fromDate || undefined,
        to: toDate || undefined,
      });
    } else {
      column.setFilterValue(undefined);
    }
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-3 p-3 w-[280px]">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Calendar className="size-4 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground w-12">From:</span>
          <Input
            className="h-9"
            onChange={(e) => setFromDate(e.target.value)}
            type="date"
            value={fromDate}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground w-12">To:</span>
          <Input
            className="h-9"
            onChange={(e) => setToDate(e.target.value)}
            type="date"
            value={toDate}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button
          onClick={() => {
            setFromDate("");
            setToDate("");
            column.setFilterValue(undefined);
            onClose?.();
          }}
          size="sm"
          variant="ghost"
        >
          Clear
        </Button>
        <Button onClick={handleApply} size="sm">
          Apply
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// ADD FILTER DROPDOWN
// ============================================================================

interface DataTableAddFilterProps<TData> {
  filters: FilterDefinition[];
  table?: TanStackTable<TData>;
}

export function DataTableAddFilter<TData>({
  filters,
  table: tableProp,
}: DataTableAddFilterProps<TData>) {
  const contextTable = useDataTableContext<TData>();
  const table = tableProp || contextTable;
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterDefinition | null>(
    null,
  );

  if (!table) {
    throw new Error(
      "DataTableAddFilter requires either a table prop or to be used within a DataTable component",
    );
  }

  // Get currently active filter column IDs
  const activeFilterIds = table.getState().columnFilters.map((f) => f.id);

  // Filter out already active filters
  const availableFilters = filters.filter(
    (f) => !activeFilterIds.includes(f.id),
  );

  const handleFilterSelect = (filter: FilterDefinition) => {
    setSelectedFilter(filter);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFilter(null);
  };

  const column = selectedFilter
    ? table.getColumn(selectedFilter.id)
    : undefined;

  // Don't show button if no filters are available
  if (availableFilters.length === 0 && !open) return null;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button className="h-9 gap-1.5 border-0 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground" size="sm" variant="outline">
          <PlusCircleIcon className="size-4" />
          Add Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-auto">
        {selectedFilter && column ? (
          selectedFilter.type === "text" ? (
            <DataTableTextFilter
              column={column}
              icon={selectedFilter.icon}
              label={selectedFilter.label}
              onClose={handleClose}
            />
          ) : selectedFilter.type === "select" && selectedFilter.options ? (
            <DataTableSelectFilter
              column={column}
              icon={selectedFilter.icon}
              label={selectedFilter.label}
              onClose={handleClose}
              options={selectedFilter.options}
            />
          ) : selectedFilter.type === "date" ? (
            <DataTableDateFilter
              column={column}
              label={selectedFilter.label}
              onClose={handleClose}
            />
          ) : null
        ) : (
          <Command className="border-0">
            <CommandInput placeholder="Search filters..." />
            <CommandList>
              <CommandEmpty>No filters available.</CommandEmpty>
              <CommandGroup heading="Available Filters">
                {availableFilters.map((filter) => {
                  const FilterIcon = filter.icon || Filter;
                  return (
                    <CommandItem
                      key={filter.id}
                      onSelect={() => handleFilterSelect(filter)}
                    >
                      <FilterIcon className="size-4 text-muted-foreground" />
                      <span>{filter.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}

// ============================================================================
// ACTIVE FILTERS DISPLAY
// ============================================================================

interface DataTableActiveFiltersProps<TData> {
  filters: FilterDefinition[];
  table?: TanStackTable<TData>;
}

export function DataTableActiveFilters<TData>({
  filters,
  table: tableProp,
}: DataTableActiveFiltersProps<TData>) {
  const contextTable = useDataTableContext<TData>();
  const table = tableProp || contextTable;
  const [editingFilter, setEditingFilter] = useState<string | null>(null);

  if (!table) {
    throw new Error(
      "DataTableActiveFilters requires either a table prop or to be used within a DataTable component",
    );
  }

  const activeFilters = table.getState().columnFilters;

  const formatFilterValue = (
    filterDef: FilterDefinition,
    value: unknown,
  ): string => {
    if (filterDef.type === "select" && Array.isArray(value)) {
      if (value.length === 1) {
        const option = filterDef.options?.find((o) => o.value === value[0]);
        return option?.label ?? value[0];
      }
      return `${value.length} selected`;
    }
    if (filterDef.type === "date" && typeof value === "object" && value) {
      const dateVal = value as { from?: string; to?: string };
      if (dateVal.from && dateVal.to) {
        return `${dateVal.from} - ${dateVal.to}`;
      }
      if (dateVal.from) return `from ${dateVal.from}`;
      if (dateVal.to) return `until ${dateVal.to}`;
    }
    return String(value);
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((filter) => {
        const filterDef = filters.find((f) => f.id === filter.id);
        if (!filterDef) return null;

        const column = table.getColumn(filter.id);
        if (!column) return null;

        return (
          <Popover
            key={filter.id}
            onOpenChange={(open) => setEditingFilter(open ? filter.id : null)}
            open={editingFilter === filter.id}
          >
            <PopoverTrigger asChild>
              <div>
                <DataTableFilterChip
                  label={filterDef.label}
                  onClick={() => setEditingFilter(filter.id)}
                  onRemove={() => column.setFilterValue(undefined)}
                  operator={filterDef.type === "select" ? "include" : "contains"}
                  value={formatFilterValue(filterDef, filter.value)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-auto">
              {filterDef.type === "text" ? (
                <DataTableTextFilter
                  column={column}
                  icon={filterDef.icon}
                  label={filterDef.label}
                  onClose={() => setEditingFilter(null)}
                />
              ) : filterDef.type === "select" && filterDef.options ? (
                <DataTableSelectFilter
                  column={column}
                  icon={filterDef.icon}
                  label={filterDef.label}
                  onClose={() => setEditingFilter(null)}
                  options={filterDef.options}
                />
              ) : filterDef.type === "date" ? (
                <DataTableDateFilter
                  column={column}
                  label={filterDef.label}
                  onClose={() => setEditingFilter(null)}
                />
              ) : null}
            </PopoverContent>
          </Popover>
        );
      })}
      <button
        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        onClick={() => table.resetColumnFilters()}
      >
        Reset filters
      </button>
    </div>
  );
}
