import { useState } from "react";
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
import { Pencil, Trash2, Eye } from "lucide-react";
import { useTrips, useDeleteTrip } from "../../hooks/useTrips";
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

const Trips = () => {
  const navigate = useNavigate();
  const { trips, isLoading, refetch } = useTrips();
  const { deleteTripAsync, isDeleting } = useDeleteTrip();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTripId, setDeletingTripId] = useState<number | null>(null);

  const handleViewTrip = (tripId: number) => {
    navigate(`/trips/${tripId}`);
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
      console.error('Error deleting trip:', error);
      alert('Error deleting trip. Please try again.');
    }
  };

  const deletingTrip = trips.find(t => t.id === deletingTripId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Trips</h1>
          <p className="text-muted-foreground mt-2">
            Manage club trips and adventures
          </p>
        </div>
        <Button size="lg">
          Add Trip
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading trips...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Trips ({trips.length})</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            {trips.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No trips yet</p>
                <Button variant="outline">Create Your First Trip</Button>
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
                  {trips.map((trip) => (
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
                      <TableCell>
                        {formatDate(trip.date_start)}
                      </TableCell>
                      <TableCell>
                        {formatDate(trip.date_end)}
                      </TableCell>
                      <TableCell>
                        Group {trip.group_num}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingTrip?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Trips;
