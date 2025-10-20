import { z } from "zod";

// Card Details Schema
export const CardDetailsSchema = z.object({
  details_id: z.number(),
  card_id: z.number(),
  location_id: z.number().nullable(),
  hype: z.string().nullable(),
  rating: z.string().nullable(),
  season: z.string().nullable(),
  length: z.string().nullable(),
  water: z.string().nullable(),
  gear: z.string().nullable(),
  rappels: z.string().nullable(),
  notes: z.string().nullable(),
  flood_danger: z.string().nullable(),
  maps: z.string().nullable(),
  gallery_img1: z.string().nullish(),
  gallery_img2: z.string().nullish(),
  gallery_img3: z.string().nullish(),
});

export type CardDetails = z.infer<typeof CardDetailsSchema>;

// RPC Schemas for Card Details
export const GetActivityDetailsRequestSchema = z.object({
  cardId: z.number(),
});

export type GetActivityDetailsRequest = z.infer<
  typeof GetActivityDetailsRequestSchema
>;

export const GetActivityDetailsResponseSchema = z.object({
  details: CardDetailsSchema,
});

export type GetActivityDetailsResponse = z.infer<
  typeof GetActivityDetailsResponseSchema
>;

export const CreateCardDetailsRequestSchema = z.object({
  cardId: z.number(),
  data: CardDetailsSchema.omit({ details_id: true, card_id: true }).extend({
    location_id: z.number().nullable().optional(),
    gallery_img1: z.string(),
    gallery_img2: z.string(),
    gallery_img3: z.string(),
  }),
});

export type CreateCardDetailsRequest = z.infer<
  typeof CreateCardDetailsRequestSchema
>;

export const CreateCardDetailsResponseSchema = z.object({
  details: CardDetailsSchema,
});

export type CreateCardDetailsResponse = z.infer<
  typeof CreateCardDetailsResponseSchema
>;

export const UpdateCardDetailsRequestSchema = z.object({
  cardId: z.number(),
  data: CardDetailsSchema.partial().omit({ details_id: true, card_id: true }),
});

export type UpdateCardDetailsRequest = z.infer<
  typeof UpdateCardDetailsRequestSchema
>;

export const UpdateCardDetailsResponseSchema = z.object({
  success: z.boolean(),
});

export type UpdateCardDetailsResponse = z.infer<
  typeof UpdateCardDetailsResponseSchema
>;
