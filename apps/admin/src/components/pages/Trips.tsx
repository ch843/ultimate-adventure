import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
} from "@ultimate-adventure/shared-components";
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
import { Pencil, Trash2, Eye, MapPin, Calendar, Users, Type } from "lucide-react";
import {
  useTrips,
  useDeleteTrip,
  useUpdateTrip,
  useCreateTrip,
} from "../../hooks/useTrips";
import { useClubMembers } from "../../hooks/useClubMembers";
import { useCreateTripMember } from "../../hooks/useTripMembers";
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
import { FormDialog } from "../dialogs/FormDialog";
import { TripForm, type TripFormData } from "../forms/TripForm";
import type { Trip } from "@ultimate-adventure/shared-models";
import { formatDate } from "../../utils/dates";
import { useTableUrlState } from "../../hooks/useTableUrlState";

// Filter definitions for the trips table
const tripFilterDefinitions: FilterDefinition[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: Type,
  },
  {
    id: "location",
    label: "Location",
    type: "text",
    icon: MapPin,
  },
  {
    id: "date_start",
    label: "Start Date",
    type: "date",
    icon: Calendar,
  },
  {
    id: "date_end",
    label: "End Date",
    type: "date",
    icon: Calendar,
  },
  {
    id: "group_num",
    label: "Group",
    type: "select",
    icon: Users,
    options: [
      { label: "Group 1", value: "1" },
      { label: "Group 2", value: "2" },
      { label: "Group 3", value: "3" },
      { label: "Group 4", value: "4" },
      { label: "Group 5", value: "5" },
    ],
  },
];

// Custom filter function for date range filtering
const dateRangeFilterFn: FilterFn<Trip> = (row, columnId, filterValue) => {
  const dateValue = row.getValue(columnId) as string;
  const { from, to } = filterValue as { from?: string; to?: string };

  if (!from && !to) return true;

  const cellDate = new Date(dateValue);
  if (from && cellDate < new Date(from)) return false;
  if (to && cellDate > new Date(to)) return false;

  return true;
};

// Custom filter function for select (array) filtering
const selectFilterFn: FilterFn<Trip> = (row, columnId, filterValue) => {
  const cellValue = String(row.getValue(columnId));
  const selectedValues = filterValue as string[];
  return selectedValues.includes(cellValue);
};

const Trips = () => {
  const navigate = useNavigate();
  const { trips, isLoading, refetch } = useTrips();
  const { deleteTripAsync, isDeleting } = useDeleteTrip();
  const { updateTripAsync, isUpdating } = useUpdateTrip();
  const { createTripAsync, isCreating } = useCreateTrip();
  const { clubMembers } = useClubMembers();
  const { createTripMemberAsync } = useCreateTripMember();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTripId, setDeletingTripId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const {
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
  } = useTableUrlState({
    defaultSorting: [{ id: "date_start", desc: false }],
  });
  const editFormRef = useRef<HTMLFormElement>(null);
  const addFormRef = useRef<HTMLFormElement>(null);

  const handleViewTrip = (tripId: number) => {
    navigate(`/trips/${tripId}`);
  };

  const handleEditClick = (trip: Trip, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingTrip(trip);
    setEditDialogOpen(true);
  };

  const handleEditSave = async (data: TripFormData) => {
    if (!editingTrip) return;

    try {
      await updateTripAsync({
        id: editingTrip.id,
        data,
      });
      refetch();
      setEditDialogOpen(false);
      setEditingTrip(null);
    } catch (error) {
      console.error("Error updating trip:", error);
      alert("Error updating trip. Please try again.");
    }
  };

  const handleAddTrip = async (data: TripFormData) => {
    try {
      const result = await createTripAsync({ data });

      // If checkbox was selected, add all members from the group
      if (data.add_group_members && result?.trip) {
        const groupMembers = clubMembers.filter(
          (m) => m.group_num === data.group_num,
        );

        // Add all group members to the trip
        await Promise.all(
          groupMembers.map((member) =>
            createTripMemberAsync({
              data: {
                trip_id: result.trip.id,
                member_id: member.id,
              },
            }),
          ),
        );
      }

      refetch();
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Error creating trip. Please try again.");
    }
  };

  const handleDeleteClick = (tripId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDeletingTripId(tripId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTripId) return;

    try {
      await deleteTripAsync({ id: deletingTripId });
      refetch();
      setDeleteDialogOpen(false);
      setDeletingTripId(null);
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Error deleting trip. Please try again.");
    }
  };

  const deletingTrip = trips.find((t) => t.id === deletingTripId);

  const columns: ColumnDef<Trip>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">{row.getValue("title")}</span>
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.getValue("location")}
          </span>
        ),
      },
      {
        accessorKey: "date_start",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">{formatDate(row.getValue("date_start"))}</span>
        ),
        filterFn: dateRangeFilterFn,
      },
      {
        accessorKey: "date_end",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">{formatDate(row.getValue("date_end"))}</span>
        ),
        filterFn: dateRangeFilterFn,
      },
      {
        accessorKey: "group_num",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Group" />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">Group {row.getValue("group_num")}</span>
        ),
        filterFn: selectFilterFn,
      },
      {
        id: "actions",
        header: () => <div className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</div>,
        cell: ({ row }) => {
          const trip = row.original;
          return (
            <div
              className="flex items-center justify-end gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewTrip(trip.id)}
              >
                <Eye className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleEditClick(trip, e)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteClick(trip.id, e)}
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
    data: trips,
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
          <h1 className="text-4xl font-bold tracking-tight">Trips</h1>
          <p className="text-muted-foreground mt-2">
            Manage club trips and adventures
          </p>
        </div>
        <Button size="lg" onClick={() => setAddDialogOpen(true)}>
          Add Trip
        </Button>
      </div>

      {trips.length === 0 && !isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No trips yet</p>
            <Button variant="outline" onClick={() => setAddDialogOpen(true)}>
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          table={table}
          loading={isLoading}
          onRowClick={({ row }) => handleViewTrip(row.id)}
        >
          <DataTableToolbar>
            <DataTableSearch />
            <DataTableAddFilter filters={tripFilterDefinitions} />
            <DataTableActiveFilters filters={tripFilterDefinitions} />
            <DataTableViewOptions />
          </DataTableToolbar>
          <DataTablePagination />
        </DataTable>
      )}

      <FormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        title="Edit Trip"
        description="Update trip information"
        formRef={editFormRef}
        isSubmitting={isUpdating}
      >
        {editingTrip && (
          <TripForm
            ref={editFormRef}
            initialValues={editingTrip}
            onSubmit={handleEditSave}
          />
        )}
      </FormDialog>

      <FormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        title="Add Trip"
        description="Create a new trip"
        formRef={addFormRef}
        isSubmitting={isCreating}
        submitButtonText="Add Trip"
        submittingText="Creating..."
      >
        <TripForm ref={addFormRef} onSubmit={handleAddTrip} />
      </FormDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingTrip?.title}". This action
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

export default Trips;
