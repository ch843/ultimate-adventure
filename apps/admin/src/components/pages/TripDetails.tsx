import { useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ultimate-adventure/shared-components";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  UserPlus,
  X,
  Mail,
} from "lucide-react";
import { useTrip, useUpdateTrip } from "../../hooks/useTrips";
import {
  useTripMembersByTripId,
  useCreateTripMember,
  useDeleteTripMember,
} from "../../hooks/useTripMembers";
import { useClubMembers } from "../../hooks/useClubMembers";
import { Spinner } from "@/components/ui/spinner";
import { FormDialog } from "../dialogs/FormDialog";
import { TripForm, type TripFormData } from "../forms/TripForm";
import {
  AddMemberToTripForm,
  type AddMemberToTripFormData,
} from "../forms/AddMemberToTripForm";
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

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tripId = parseInt(id || "0", 10);
  const { trip, isLoading, refetch: refetchTrip } = useTrip(tripId);
  const {
    tripMembers,
    isLoading: isLoadingMembers,
    refetch: refetchTripMembers,
  } = useTripMembersByTripId(tripId);
  const { clubMembers, isLoading: isLoadingClubMembers } = useClubMembers();
  const { updateTripAsync, isUpdating } = useUpdateTrip();
  const { createTripMemberAsync, isCreating } = useCreateTripMember();
  const { deleteTripMemberAsync, isDeleting } = useDeleteTripMember();

  const [editTripDialogOpen, setEditTripDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [removeMemberDialogOpen, setRemoveMemberDialogOpen] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState<number | null>(null);
  const editTripFormRef = useRef<HTMLFormElement>(null);
  const addMemberFormRef = useRef<HTMLFormElement>(null);

  const handleEditTrip = async (data: TripFormData) => {
    if (!trip) return;

    try {
      await updateTripAsync({
        id: trip.id,
        data,
      });
      refetchTrip();
      setEditTripDialogOpen(false);
    } catch (error) {
      console.error("Error updating trip:", error);
      alert("Error updating trip. Please try again.");
    }
  };

  const handleAddMember = async (data: AddMemberToTripFormData) => {
    try {
      // Create trip member records for each selected member
      await Promise.all(
        data.memberIds.map((memberId) =>
          createTripMemberAsync({
            data: {
              trip_id: tripId,
              member_id: memberId,
            },
          }),
        ),
      );
      refetchTripMembers();
      setAddMemberDialogOpen(false);
    } catch (error) {
      console.error("Error adding members:", error);
      alert("Error adding members to trip. Please try again.");
    }
  };

  const handleRemoveMemberClick = (tripMemberId: number) => {
    setRemovingMemberId(tripMemberId);
    setRemoveMemberDialogOpen(true);
  };

  const handleRemoveMemberConfirm = async () => {
    if (!removingMemberId) return;

    try {
      await deleteTripMemberAsync({ id: removingMemberId });
      refetchTripMembers();
      setRemoveMemberDialogOpen(false);
      setRemovingMemberId(null);
    } catch (error) {
      console.error("Error removing member:", error);
      alert("Error removing member from trip. Please try again.");
    }
  };

  const handleEmailMembers = () => {
    const emails = tripMembersWithDetails
      .map((m) => m.email)
      .filter(Boolean)
      .join(",");
    const subject = encodeURIComponent(
      `${trip?.title || "Trip"} - ${trip?.location || ""}`,
    );
    window.location.href = `mailto:?bcc=${emails}&subject=${subject}`;
  };

  // Get full member details for trip members
  const tripMembersWithDetails = useMemo(() => {
    return tripMembers
      .map((tm) => {
        const member = clubMembers.find((m) => m.id === tm.member_id);
        return {
          tripMemberId: tm.id,
          ...member,
        };
      })
      .filter((m) => m.id); // Filter out any that didn't match
  }, [tripMembers, clubMembers]);

  // Filter available members (not already on this trip)
  const availableMembers = useMemo(() => {
    const tripMemberIds = new Set(tripMembers.map((tm) => tm.member_id));
    return clubMembers.filter((m) => !tripMemberIds.has(m.id));
  }, [clubMembers, tripMembers]);

  const removingMember = tripMembersWithDetails.find(
    (m) => m.tripMemberId === removingMemberId,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner className="size-8" />
          <p className="mt-4 text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Trip not found</p>
            <Button className="mt-4" onClick={() => navigate("/trips")}>
              Back to Trips
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/trips")}
        className="mb-6"
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to Trips
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trip Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl">{trip.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{trip.location}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setEditTripDialogOpen(true)}
                >
                  Edit Trip
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="size-5" />
                  Trip Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Start Date
                    </p>
                    <p className="font-medium">{formatDate(trip.date_start)}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      End Date
                    </p>
                    <p className="font-medium">{formatDate(trip.date_end)}</p>
                  </div>
                </div>
              </div>

              {/* Group Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="size-5" />
                  Group Information
                </h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Group Number
                  </p>
                  <p className="font-medium">Group {trip.group_num}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trip Members</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEmailMembers}
                    disabled={tripMembersWithDetails.length === 0}
                  >
                    <Mail className="size-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAddMemberDialogOpen(true)}
                  >
                    <UserPlus className="size-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingMembers || isLoadingClubMembers ? (
                <div className="flex justify-center py-4">
                  <Spinner className="size-6" />
                </div>
              ) : tripMembersWithDetails.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="size-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">
                    No members yet
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setAddMemberDialogOpen(true)}
                  >
                    Add First Member
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {tripMembersWithDetails.map((member) => (
                    <div
                      key={member.tripMemberId}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {member.first_name} {member.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {member.email}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleRemoveMemberClick(member.tripMemberId!)
                        }
                        disabled={isDeleting}
                      >
                        <X className="size-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Trip Dialog */}
      {trip && (
        <FormDialog
          open={editTripDialogOpen}
          onOpenChange={setEditTripDialogOpen}
          title="Edit Trip"
          description="Update trip information"
          formRef={editTripFormRef}
          isSubmitting={isUpdating}
        >
          <TripForm
            ref={editTripFormRef}
            initialValues={trip}
            onSubmit={handleEditTrip}
          />
        </FormDialog>
      )}

      {/* Add Member Dialog */}
      <FormDialog
        open={addMemberDialogOpen}
        onOpenChange={setAddMemberDialogOpen}
        title="Add Members to Trip"
        description="Select one or more club members to add to this trip"
        formRef={addMemberFormRef}
        isSubmitting={isCreating}
        submitButtonText="Add Members"
        submittingText="Adding..."
      >
        <AddMemberToTripForm
          ref={addMemberFormRef}
          availableMembers={availableMembers}
          isLoadingMembers={isLoadingClubMembers}
          onSubmit={handleAddMember}
        />
      </FormDialog>

      {/* Remove Member Confirmation Dialog */}
      <AlertDialog
        open={removeMemberDialogOpen}
        onOpenChange={setRemoveMemberDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {removingMember?.first_name}{" "}
              {removingMember?.last_name} from this trip?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMemberConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TripDetails;
