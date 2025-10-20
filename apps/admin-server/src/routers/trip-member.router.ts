import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetTripMemberRequestSchema,
  GetAllTripMembersRequestSchema,
  GetTripMembersByTripIdRequestSchema,
  GetTripMembersByMemberIdRequestSchema,
  CreateTripMemberRequestSchema,
  UpdateTripMemberRequestSchema,
  DeleteTripMemberRequestSchema,
} from "@ultimate-adventure/shared-models";
import { tripMemberService } from "../services/trip-member.service";

export const tripMemberRouter = router({
  getTripMember: publicProcedure
    .input(GetTripMemberRequestSchema)
    .query(({ input }) => tripMemberService.getTripMember(input)),

  getAllTripMembers: publicProcedure
    .input(GetAllTripMembersRequestSchema)
    .query(({ input }) => tripMemberService.getAllTripMembers(input)),

  getTripMembersByTripId: publicProcedure
    .input(GetTripMembersByTripIdRequestSchema)
    .query(({ input }) => tripMemberService.getTripMembersByTripId(input)),

  getTripMembersByMemberId: publicProcedure
    .input(GetTripMembersByMemberIdRequestSchema)
    .query(({ input }) => tripMemberService.getTripMembersByMemberId(input)),

  createTripMember: publicProcedure
    .input(CreateTripMemberRequestSchema)
    .mutation(({ input }) => tripMemberService.createTripMember(input)),

  updateTripMember: publicProcedure
    .input(UpdateTripMemberRequestSchema)
    .mutation(({ input }) => tripMemberService.updateTripMember(input)),

  deleteTripMember: publicProcedure
    .input(DeleteTripMemberRequestSchema)
    .mutation(({ input }) => tripMemberService.deleteTripMember(input)),
});

export type TripMemberRouter = typeof tripMemberRouter;
