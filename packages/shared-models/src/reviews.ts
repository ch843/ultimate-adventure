import { z } from "zod";
import { zodDeepPartial } from "zod-deep-partial";


export const ReviewInfoSchema = z.object({
    id: z.number(),
    name: z.string().nullable(),
    date: z.string().nullable(),
    description: z.string().nullable(),
    picture_link: z.string().nullable(),
    published: z.boolean().nullable(),
    created_at: z.string(),
})

export type ReviewInfo = z.infer<typeof ReviewInfoSchema>;

// RPC Schemas for Reviews
export const GetReviewInfoRequestSchema = z.object({})

export type GetReviewInfoRequest = z.infer<
    typeof GetReviewInfoRequestSchema
>;

export const CreateReviewRequestSchema = zodDeepPartial(ReviewInfoSchema)
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

