import { router, publicProcedure } from '@ultimate-adventure/backend-utils';
import {
  GetTripRequestSchema,
  GetAllTripsRequestSchema,
  CreateTripRequestSchema,
  UpdateTripRequestSchema,
  DeleteTripRequestSchema,
} from '@ultimate-adventure/shared-models';
import { tripService } from '../services/trip.service';

export const tripRouter = router({
  getTrip: publicProcedure
    .input(GetTripRequestSchema)
    .query(({ input }) => tripService.getTrip(input)),

  getAllTrips: publicProcedure
    .input(GetAllTripsRequestSchema)
    .query(({ input }) => tripService.getAllTrips(input)),

  createTrip: publicProcedure
    .input(CreateTripRequestSchema)
    .mutation(({ input }) => tripService.createTrip(input)),

  updateTrip: publicProcedure
    .input(UpdateTripRequestSchema)
    .mutation(({ input }) => tripService.updateTrip(input)),

  deleteTrip: publicProcedure
    .input(DeleteTripRequestSchema)
    .mutation(({ input }) => tripService.deleteTrip(input)),
});

export type TripRouter = typeof tripRouter;
