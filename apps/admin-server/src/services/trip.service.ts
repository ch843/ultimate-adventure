import type {
  GetTripRequest,
  GetTripResponse,
  GetAllTripsRequest,
  GetAllTripsResponse,
  CreateTripRequest,
  CreateTripResponse,
  UpdateTripRequest,
  UpdateTripResponse,
  DeleteTripRequest,
  DeleteTripResponse,
  Trip,
} from "@ultimate-adventure/shared-models";
import { TripSchema } from "@ultimate-adventure/shared-models";
import { TripDAO } from "@ultimate-adventure/backend-utils";

export const tripService = {
  async getTrip(request: GetTripRequest): Promise<GetTripResponse> {
    const dbTrip = await TripDAO.getTrip(request.id);

    // Validate the response from DB with Zod
    const trip: Trip = TripSchema.parse(dbTrip);

    return { trip };
  },

  async getAllTrips(
    _request: GetAllTripsRequest,
  ): Promise<GetAllTripsResponse> {
    const dbTrips = await TripDAO.getAllTrips();

    // Validate all trips from DB with Zod
    const trips: Trip[] = dbTrips.map((trip) => TripSchema.parse(trip));

    return { trips };
  },

  async createTrip(request: CreateTripRequest): Promise<CreateTripResponse> {
    const dbTrip = await TripDAO.createTrip(request.data);

    // Validate the response from DB with Zod
    const trip: Trip = TripSchema.parse(dbTrip);

    return { trip };
  },

  async updateTrip(request: UpdateTripRequest): Promise<UpdateTripResponse> {
    await TripDAO.updateTrip(request.id, request.data);

    return { success: true };
  },

  async deleteTrip(request: DeleteTripRequest): Promise<DeleteTripResponse> {
    await TripDAO.deleteTrip(request.id);

    return { success: true };
  },
};
