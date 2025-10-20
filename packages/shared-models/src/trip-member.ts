import { z } from 'zod';

// Trip Member Schema
export const TripMemberSchema = z.object({
  id: z.number(),
  trip_id: z.number(),
  member_id: z.number(),
});

export type TripMember = z.infer<typeof TripMemberSchema>;

// RPC Schemas for Trip Members
export const GetTripMemberRequestSchema = z.object({
  id: z.number(),
});

export type GetTripMemberRequest = z.infer<typeof GetTripMemberRequestSchema>;

export const GetTripMemberResponseSchema = z.object({
  tripMember: TripMemberSchema,
});

export type GetTripMemberResponse = z.infer<typeof GetTripMemberResponseSchema>;

export const GetAllTripMembersRequestSchema = z.object({});

export type GetAllTripMembersRequest = z.infer<typeof GetAllTripMembersRequestSchema>;

export const GetAllTripMembersResponseSchema = z.object({
  tripMembers: z.array(TripMemberSchema),
});

export type GetAllTripMembersResponse = z.infer<typeof GetAllTripMembersResponseSchema>;

export const GetTripMembersByTripIdRequestSchema = z.object({
  tripId: z.number(),
});

export type GetTripMembersByTripIdRequest = z.infer<typeof GetTripMembersByTripIdRequestSchema>;

export const GetTripMembersByTripIdResponseSchema = z.object({
  tripMembers: z.array(TripMemberSchema),
});

export type GetTripMembersByTripIdResponse = z.infer<typeof GetTripMembersByTripIdResponseSchema>;

export const GetTripMembersByMemberIdRequestSchema = z.object({
  memberId: z.number(),
});

export type GetTripMembersByMemberIdRequest = z.infer<typeof GetTripMembersByMemberIdRequestSchema>;

export const GetTripMembersByMemberIdResponseSchema = z.object({
  tripMembers: z.array(TripMemberSchema),
});

export type GetTripMembersByMemberIdResponse = z.infer<typeof GetTripMembersByMemberIdResponseSchema>;

export const CreateTripMemberRequestSchema = z.object({
  data: TripMemberSchema.omit({ id: true }),
});

export type CreateTripMemberRequest = z.infer<typeof CreateTripMemberRequestSchema>;

export const CreateTripMemberResponseSchema = z.object({
  tripMember: TripMemberSchema,
});

export type CreateTripMemberResponse = z.infer<typeof CreateTripMemberResponseSchema>;

export const UpdateTripMemberRequestSchema = z.object({
  id: z.number(),
  data: TripMemberSchema.partial().omit({ id: true }),
});

export type UpdateTripMemberRequest = z.infer<typeof UpdateTripMemberRequestSchema>;

export const UpdateTripMemberResponseSchema = z.object({
  success: z.boolean(),
});

export type UpdateTripMemberResponse = z.infer<typeof UpdateTripMemberResponseSchema>;

export const DeleteTripMemberRequestSchema = z.object({
  id: z.number(),
});

export type DeleteTripMemberRequest = z.infer<typeof DeleteTripMemberRequestSchema>;

export const DeleteTripMemberResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteTripMemberResponse = z.infer<typeof DeleteTripMemberResponseSchema>;
