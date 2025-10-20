import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ultimate-adventure/shared-components";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { useTrip } from "../../hooks/useTrips";
import { Spinner } from "@/components/ui/spinner";

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tripId = parseInt(id || "0", 10);
  const { trip, isLoading } = useTrip(tripId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
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
            <Button className="mt-4" onClick={() => navigate('/trips')}>
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
        onClick={() => navigate('/trips')}
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
                <Button variant="outline">
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
                    <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                    <p className="font-medium">{formatDate(trip.date_start)}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">End Date</p>
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
                  <p className="text-sm text-muted-foreground mb-1">Group Number</p>
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
              <CardTitle>Trip Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Members registered for this trip
              </p>
              <Button variant="outline" className="w-full">
                Add Member
              </Button>
              <div className="mt-4 text-center text-muted-foreground text-sm">
                No members yet
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
