import type {
  GetTripMemberRequest,
  GetTripMemberResponse,
  GetAllTripMembersRequest,
  GetAllTripMembersResponse,
  GetTripMembersByTripIdRequest,
  GetTripMembersByTripIdResponse,
  GetTripMembersByMemberIdRequest,
  GetTripMembersByMemberIdResponse,
  CreateTripMemberRequest,
  CreateTripMemberResponse,
  UpdateTripMemberRequest,
  UpdateTripMemberResponse,
  DeleteTripMemberRequest,
  DeleteTripMemberResponse,
  TripMember,
} from '@ultimate-adventure/shared-models';
import {
  TripMemberSchema,
} from '@ultimate-adventure/shared-models';
import { TripMemberDAO } from '@ultimate-adventure/backend-utils';

export const tripMemberService = {
  async getTripMember(request: GetTripMemberRequest): Promise<GetTripMemberResponse> {
    const dbTripMember = await TripMemberDAO.getTripMember(request.id);

    // Validate the response from DB with Zod
    const tripMember: TripMember = TripMemberSchema.parse(dbTripMember);

    return { tripMember };
  },

  async getAllTripMembers(_request: GetAllTripMembersRequest): Promise<GetAllTripMembersResponse> {
    const dbTripMembers = await TripMemberDAO.getAllTripMembers();

    // Validate all trip members from DB with Zod
    const tripMembers: TripMember[] = dbTripMembers.map(tm => TripMemberSchema.parse(tm));

    return { tripMembers };
  },

  async getTripMembersByTripId(request: GetTripMembersByTripIdRequest): Promise<GetTripMembersByTripIdResponse> {
    const dbTripMembers = await TripMemberDAO.getTripMembersByTripId(request.tripId);

    // Validate all trip members from DB with Zod
    const tripMembers: TripMember[] = dbTripMembers.map(tm => TripMemberSchema.parse(tm));

    return { tripMembers };
  },

  async getTripMembersByMemberId(request: GetTripMembersByMemberIdRequest): Promise<GetTripMembersByMemberIdResponse> {
    const dbTripMembers = await TripMemberDAO.getTripMembersByMemberId(request.memberId);

    // Validate all trip members from DB with Zod
    const tripMembers: TripMember[] = dbTripMembers.map(tm => TripMemberSchema.parse(tm));

    return { tripMembers };
  },

  async createTripMember(request: CreateTripMemberRequest): Promise<CreateTripMemberResponse> {
    const dbTripMember = await TripMemberDAO.createTripMember(request.data);

    // Validate the response from DB with Zod
    const tripMember: TripMember = TripMemberSchema.parse(dbTripMember);

    return { tripMember };
  },

  async updateTripMember(request: UpdateTripMemberRequest): Promise<UpdateTripMemberResponse> {
    await TripMemberDAO.updateTripMember(request.id, request.data);

    return { success: true };
  },

  async deleteTripMember(request: DeleteTripMemberRequest): Promise<DeleteTripMemberResponse> {
    await TripMemberDAO.deleteTripMember(request.id);

    return { success: true };
  },
};
