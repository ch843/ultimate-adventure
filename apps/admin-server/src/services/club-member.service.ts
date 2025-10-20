import type {
  GetClubMemberRequest,
  GetClubMemberResponse,
  GetAllClubMembersRequest,
  GetAllClubMembersResponse,
  CreateClubMemberRequest,
  CreateClubMemberResponse,
  UpdateClubMemberRequest,
  UpdateClubMemberResponse,
  DeleteClubMemberRequest,
  DeleteClubMemberResponse,
  ClubMember,
} from "@ultimate-adventure/shared-models";
import { ClubMemberSchema } from "@ultimate-adventure/shared-models";
import { ClubMemberDAO } from "@ultimate-adventure/backend-utils";

export const clubMemberService = {
  async getClubMember(
    request: GetClubMemberRequest,
  ): Promise<GetClubMemberResponse> {
    const dbMember = await ClubMemberDAO.getClubMember(request.id);

    // Validate the response from DB with Zod
    const member: ClubMember = ClubMemberSchema.parse(dbMember);

    return { member };
  },

  async getAllClubMembers(
    _request: GetAllClubMembersRequest,
  ): Promise<GetAllClubMembersResponse> {
    const dbMembers = await ClubMemberDAO.getAllClubMembers();

    // Validate all members from DB with Zod
    const members: ClubMember[] = dbMembers.map((member) =>
      ClubMemberSchema.parse(member),
    );

    return { members };
  },

  async createClubMember(
    request: CreateClubMemberRequest,
  ): Promise<CreateClubMemberResponse> {
    const dbMember = await ClubMemberDAO.createClubMember(request.data);

    // Validate the response from DB with Zod
    const member: ClubMember = ClubMemberSchema.parse(dbMember);

    return { member };
  },

  async updateClubMember(
    request: UpdateClubMemberRequest,
  ): Promise<UpdateClubMemberResponse> {
    await ClubMemberDAO.updateClubMember(request.id, request.data);

    return { success: true };
  },

  async deleteClubMember(
    request: DeleteClubMemberRequest,
  ): Promise<DeleteClubMemberResponse> {
    await ClubMemberDAO.deleteClubMember(request.id);

    return { success: true };
  },
};
