import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ultimate-adventure/shared-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Eye, Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleDeleteClick = (tripId: number) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter trips based on search query
  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) {
      return trips;
    }

    const query = searchQuery.toLowerCase();
    return trips.filter((trip) => {
      const title = trip.title.toLowerCase();
      const location = trip.location.toLowerCase();
      const groupNum = trip.group_num.toString();
      const startDate = formatDate(trip.date_start).toLowerCase();
      const endDate = formatDate(trip.date_end).toLowerCase();

      return (
        title.includes(query) ||
        location.includes(query) ||
        groupNum.includes(query) ||
        startDate.includes(query) ||
        endDate.includes(query)
      );
    });
  }, [trips, searchQuery]);

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

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Loading trips...
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                All Trips ({filteredTrips.length}
                {searchQuery && ` of ${trips.length}`})
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            {trips.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No trips yet</p>
                <Button
                  variant="outline"
                  onClick={() => setAddDialogOpen(true)}
                >
                  Create Your First Trip
                </Button>
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No trips found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow
                      key={trip.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewTrip(trip.id)}
                    >
                      <TableCell className="font-medium">
                        {trip.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {trip.location}
                      </TableCell>
                      <TableCell>{formatDate(trip.date_start)}</TableCell>
                      <TableCell>{formatDate(trip.date_end)}</TableCell>
                      <TableCell>Group {trip.group_num}</TableCell>
                      <TableCell className="text-right">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(trip.id);
                            }}
                            disabled={isDeleting}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
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
