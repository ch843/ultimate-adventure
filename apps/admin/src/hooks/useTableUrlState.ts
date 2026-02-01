import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type {
  SortingState,
  ColumnFiltersState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

interface UseTableUrlStateOptions {
  defaultSorting?: SortingState;
  defaultPageSize?: number;
}

export function useTableUrlState(options: UseTableUrlStateOptions = {}) {
  const { defaultSorting = [], defaultPageSize = 500 } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse sorting from URL
  const sorting: SortingState = useMemo(() => {
    const sortParam = searchParams.get("sort");
    if (!sortParam) return defaultSorting;

    const parts = sortParam.split(",").map((s) => {
      const [id, dir] = s.split(":");
      return { id, desc: dir === "desc" };
    });
    return parts;
  }, [searchParams, defaultSorting]);

  // Parse column filters from URL
  const columnFilters: ColumnFiltersState = useMemo(() => {
    const filtersParam = searchParams.get("filters");
    if (!filtersParam) return [];

    try {
      return JSON.parse(decodeURIComponent(filtersParam));
    } catch {
      return [];
    }
  }, [searchParams]);

  // Parse global filter from URL
  const globalFilter: string = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  // Parse pagination from URL
  const pagination: PaginationState = useMemo(() => {
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(
      searchParams.get("pageSize") || String(defaultPageSize),
      10,
    );
    return { pageIndex: page, pageSize };
  }, [searchParams, defaultPageSize]);

  // Helper to update search params without losing other params
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(updates)) {
            if (value === null || value === "" || value === "[]") {
              next.delete(key);
            } else {
              next.set(key, value);
            }
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Setters that update URL
  const onSortingChange: OnChangeFn<SortingState> = useCallback(
    (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      const sortStr =
        newSorting.length > 0
          ? newSorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`).join(",")
          : null;

      updateParams({ sort: sortStr });
    },
    [sorting, updateParams],
  );

  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (updaterOrValue) => {
      const newFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnFilters)
          : updaterOrValue;

      const filtersStr =
        newFilters.length > 0
          ? encodeURIComponent(JSON.stringify(newFilters))
          : null;

      updateParams({ filters: filtersStr });
    },
    [columnFilters, updateParams],
  );

  const onGlobalFilterChange = useCallback(
    (value: string) => {
      updateParams({ search: value || null });
    },
    [updateParams],
  );

  const onPaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(pagination)
          : updaterOrValue;

      updateParams({
        page: newPagination.pageIndex > 0 ? String(newPagination.pageIndex) : null,
        pageSize:
          newPagination.pageSize !== defaultPageSize
            ? String(newPagination.pageSize)
            : null,
      });
    },
    [pagination, updateParams, defaultPageSize],
  );

  return {
    // State values
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    // Setters
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
  };
}
