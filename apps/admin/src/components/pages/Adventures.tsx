import { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
} from "@ultimate-adventure/shared-components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type FilterFn,
} from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
  DataTableViewOptions,
} from "@/components/ui/data-table";
import {
  DataTableAddFilter,
  DataTableActiveFilters,
  type FilterDefinition,
} from "@/components/ui/data-table-filters";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Tag, MapPin, Type } from "lucide-react";
import EditCardForm from "../forms/EditCardForm.tsx";
import { AddAdventureDialog } from "../dialogs/AddAdventureDialog";
import {
  useActivityCards,
  useDeleteActivityCard,
} from "../../hooks/useActivityCards";
import type { AdventureCard } from "@ultimate-adventure/shared-models";
import { useTableUrlState } from "../../hooks/useTableUrlState";

const getCategoryBadgeProps = (category: string) => {
  switch (category) {
    case "Canyoneering":
      return {
        variant: "default" as const,
        className: "bg-emerald-600 text-white hover:bg-emerald-700",
      };
    case "Climbing":
      return {
        variant: "default" as const,
        className: "bg-orange-600 text-white hover:bg-orange-700",
      };
    case "Rafting":
      return {
        variant: "default" as const,
        className: "bg-blue-600 text-white hover:bg-blue-700",
      };
    default:
      return { variant: "secondary" as const };
  }
};

// Custom filter function for select (array) filtering
const selectFilterFn: FilterFn<AdventureCard> = (row, columnId, filterValue) => {
  const cellValue = String(row.getValue(columnId));
  const selectedValues = filterValue as string[];
  return selectedValues.includes(cellValue);
};

const Adventures = () => {
  const { activityCards, isLoading, refetch } = useActivityCards();
  const { deleteActivityCardAsync, isDeleting } = useDeleteActivityCard();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);
  const {
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
  } = useTableUrlState();

  // Extract unique categories and locations for filter options
  const categoryOptions = useMemo(() => {
    const categories = [...new Set(activityCards.map((card) => card.category))];
    return categories.map((cat) => ({ label: cat, value: cat }));
  }, [activityCards]);

  const locationOptions = useMemo(() => {
    const locations = [...new Set(activityCards.map((card) => card.location))];
    return locations.map((loc) => ({ label: loc, value: loc }));
  }, [activityCards]);

  // Filter definitions for the adventures table
  const adventureFilterDefinitions: FilterDefinition[] = useMemo(
    () => [
      {
        id: "title",
        label: "Title",
        type: "text",
        icon: Type,
      },
      {
        id: "category",
        label: "Category",
        type: "select",
        icon: Tag,
        options: categoryOptions,
      },
      {
        id: "location",
        label: "Location",
        type: "select",
        icon: MapPin,
        options: locationOptions,
      },
    ],
    [categoryOptions, locationOptions],
  );

  const handleEditCard = (cardId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingCardId(cardId);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingCardId(null);
  };

  const handleSaveCard = () => {
    refetch();
  };

  const handleDeleteClick = (cardId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDeletingCardId(cardId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCardId) return;

    try {
      await deleteActivityCardAsync({ id: deletingCardId });
      refetch();
      setDeleteDialogOpen(false);
      setDeletingCardId(null);
    } catch (error) {
      console.error("Error deleting adventure:", error);
      alert("Error deleting adventure. Please try again.");
    }
  };

  const deletingCard = activityCards.find(
    (card) => card.card_id === deletingCardId,
  );

  const columns: ColumnDef<AdventureCard>[] = useMemo(
    () => [
      {
        accessorKey: "img_link",
        header: () => (
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Image
          </div>
        ),
        cell: ({ row }) => (
          <img
            src={row.getValue("img_link")}
            alt={row.original.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.getValue("title")}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => (
          <Badge {...getCategoryBadgeProps(row.getValue("category"))}>
            {row.getValue("category")}
          </Badge>
        ),
        filterFn: selectFilterFn,
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("location")}
          </span>
        ),
        filterFn: selectFilterFn,
      },
      {
        accessorKey: "price_pp",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pricing" />
        ),
        cell: ({ row }) => {
          const pricePp = row.getValue("price_pp") as number | null;
          const hourly = row.original.hourly;
          return pricePp ? (
            <span className="text-sm text-foreground">
              ${pricePp}/person{hourly && "/hr"}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
      },
      {
        id: "actions",
        header: () => (
          <div className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Actions
          </div>
        ),
        cell: ({ row }) => {
          const card = row.original;
          return (
            <div
              className="flex items-center justify-end gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleEditCard(card.card_id, e)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteClick(card.card_id, e)}
                disabled={isDeleting}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [isDeleting],
  );

  const table = useReactTable({
    data: activityCards,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Adventures</h1>
          <p className="text-muted-foreground mt-2">
            Manage your adventure activities and experiences
          </p>
        </div>
        <Button size="lg" onClick={() => setAddModalOpen(true)}>
          Add Adventure
        </Button>
      </div>

      {activityCards.length === 0 && !isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No adventures yet</p>
            <Button variant="outline" onClick={() => setAddModalOpen(true)}>
              Create Your First Adventure
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable table={table} loading={isLoading}>
          <DataTableToolbar>
            <DataTableSearch />
            <DataTableAddFilter filters={adventureFilterDefinitions} />
            <DataTableActiveFilters filters={adventureFilterDefinitions} />
            <DataTableViewOptions />
          </DataTableToolbar>
          <DataTablePagination />
        </DataTable>
      )}

      {editingCardId && (
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Adventure</DialogTitle>
            </DialogHeader>
            <EditCardForm
              cardId={editingCardId}
              onSave={handleSaveCard}
              onClose={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      )}

      <AddAdventureDialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={refetch}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingCard?.title}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Adventures;
