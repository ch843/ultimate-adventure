import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetClubMemberRequestSchema,
  GetAllClubMembersRequestSchema,
  CreateClubMemberRequestSchema,
  UpdateClubMemberRequestSchema,
  DeleteClubMemberRequestSchema,
} from "@ultimate-adventure/shared-models";
import { clubMemberService } from "../services/club-member.service";

export const clubMemberRouter = router({
  getClubMember: publicProcedure
    .input(GetClubMemberRequestSchema)
    .query(({ input }) => clubMemberService.getClubMember(input)),

  getAllClubMembers: publicProcedure
    .input(GetAllClubMembersRequestSchema)
    .query(({ input }) => clubMemberService.getAllClubMembers(input)),

  createClubMember: publicProcedure
    .input(CreateClubMemberRequestSchema)
    .mutation(({ input }) => clubMemberService.createClubMember(input)),

  updateClubMember: publicProcedure
    .input(UpdateClubMemberRequestSchema)
    .mutation(({ input }) => clubMemberService.updateClubMember(input)),

  deleteClubMember: publicProcedure
    .input(DeleteClubMemberRequestSchema)
    .mutation(({ input }) => clubMemberService.deleteClubMember(input)),
});

export type ClubMemberRouter = typeof clubMemberRouter;
