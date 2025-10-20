import { z } from "zod";

// Club Member Schema
export const ClubMemberSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone_num: z.string().nullable(),
  group_num: z.number(),
  experience_level: z.string().nullable(),
  paid_for_year: z.boolean(),
  waiver_link: z.string().nullable(),
  notes: z.string().nullable(),
});

export type ClubMember = z.infer<typeof ClubMemberSchema>;

// RPC Schemas for Club Members
export const GetClubMemberRequestSchema = z.object({
  id: z.number(),
});

export type GetClubMemberRequest = z.infer<typeof GetClubMemberRequestSchema>;

export const GetClubMemberResponseSchema = z.object({
  member: ClubMemberSchema,
});

export type GetClubMemberResponse = z.infer<typeof GetClubMemberResponseSchema>;

export const GetAllClubMembersRequestSchema = z.object({});

export type GetAllClubMembersRequest = z.infer<
  typeof GetAllClubMembersRequestSchema
>;

export const GetAllClubMembersResponseSchema = z.object({
  members: z.array(ClubMemberSchema),
});

export type GetAllClubMembersResponse = z.infer<
  typeof GetAllClubMembersResponseSchema
>;

export const CreateClubMemberRequestSchema = z.object({
  data: ClubMemberSchema.omit({ id: true }),
});

export type CreateClubMemberRequest = z.infer<
  typeof CreateClubMemberRequestSchema
>;

export const CreateClubMemberResponseSchema = z.object({
  member: ClubMemberSchema,
});

export type CreateClubMemberResponse = z.infer<
  typeof CreateClubMemberResponseSchema
>;

export const UpdateClubMemberRequestSchema = z.object({
  id: z.number(),
  data: ClubMemberSchema.partial().omit({ id: true }),
});

export type UpdateClubMemberRequest = z.infer<
  typeof UpdateClubMemberRequestSchema
>;

export const UpdateClubMemberResponseSchema = z.object({
  success: z.boolean(),
});

export type UpdateClubMemberResponse = z.infer<
  typeof UpdateClubMemberResponseSchema
>;

export const DeleteClubMemberRequestSchema = z.object({
  id: z.number(),
});

export type DeleteClubMemberRequest = z.infer<
  typeof DeleteClubMemberRequestSchema
>;

export const DeleteClubMemberResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteClubMemberResponse = z.infer<
  typeof DeleteClubMemberResponseSchema
>;
