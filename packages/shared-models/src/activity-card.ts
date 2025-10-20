import { z } from "zod";

// Adventure Card (Activity Card) Schema
export const AdventureCardSchema = z.object({
  card_id: z.number(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
  img_link: z.string(),
  adult_price: z.number().nullable(),
  child_price: z.number().nullable(),
  price_pp: z.number().nullable(),
  hourly: z.boolean(),
  full_day_pp: z.number().nullable(),
  half_day_pp: z.number().nullable(),
  min_people: z.number().nullable(),
  max_people: z.number().nullable(),
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export type AdventureCard = z.infer<typeof AdventureCardSchema>;

// RPC Schemas for Adventure Cards
export const GetActivityCardRequestSchema = z.object({
  id: z.number(),
});

export type GetActivityCardRequest = z.infer<
  typeof GetActivityCardRequestSchema
>;

export const GetActivityCardResponseSchema = z.object({
  card: AdventureCardSchema,
});

export type GetActivityCardResponse = z.infer<
  typeof GetActivityCardResponseSchema
>;

export const GetAllActivityCardsRequestSchema = z.object({});

export type GetAllActivityCardsRequest = z.infer<
  typeof GetAllActivityCardsRequestSchema
>;

export const GetAllActivityCardsResponseSchema = z.object({
  cards: z.array(AdventureCardSchema),
});

export type GetAllActivityCardsResponse = z.infer<
  typeof GetAllActivityCardsResponseSchema
>;

export const CreateActivityCardRequestSchema = z.object({
  data: AdventureCardSchema.omit({
    card_id: true,
    created_at: true,
    updated_at: true,
  }),
});

export type CreateActivityCardRequest = z.infer<
  typeof CreateActivityCardRequestSchema
>;

export const CreateActivityCardResponseSchema = z.object({
  card: AdventureCardSchema,
});

export type CreateActivityCardResponse = z.infer<
  typeof CreateActivityCardResponseSchema
>;

export const UpdateActivityCardRequestSchema = z.object({
  id: z.number(),
  data: AdventureCardSchema.partial().omit({ card_id: true, created_at: true }),
});

export type UpdateActivityCardRequest = z.infer<
  typeof UpdateActivityCardRequestSchema
>;

export const UpdateActivityCardResponseSchema = z.object({
  success: z.boolean(),
});

export type UpdateActivityCardResponse = z.infer<
  typeof UpdateActivityCardResponseSchema
>;

export const DeleteActivityCardRequestSchema = z.object({
  id: z.number(),
});

export type DeleteActivityCardRequest = z.infer<
  typeof DeleteActivityCardRequestSchema
>;

export const DeleteActivityCardResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteActivityCardResponse = z.infer<
  typeof DeleteActivityCardResponseSchema
>;
