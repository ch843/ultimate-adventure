import { z } from "zod";

// Adventure schema
export const AdventureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Adventure = z.infer<typeof AdventureSchema>;

// Request/Response schemas
export const GetAdventureRequestSchema = z.object({
  id: z.string(),
});

export type GetAdventureRequest = z.infer<typeof GetAdventureRequestSchema>;

export const GetAdventureResponseSchema = z.object({
  adventure: AdventureSchema,
});

export type GetAdventureResponse = z.infer<typeof GetAdventureResponseSchema>;

export const ListAdventuresRequestSchema = z.object({
  pageSize: z.number().int().positive().optional(),
  pageToken: z.string().optional(),
});

export type ListAdventuresRequest = z.infer<typeof ListAdventuresRequestSchema>;

export const ListAdventuresResponseSchema = z.object({
  adventures: z.array(AdventureSchema),
  nextPageToken: z.string().optional(),
});

export type ListAdventuresResponse = z.infer<
  typeof ListAdventuresResponseSchema
>;

export const CreateAdventureRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
});

export type CreateAdventureRequest = z.infer<
  typeof CreateAdventureRequestSchema
>;

export const CreateAdventureResponseSchema = z.object({
  adventure: AdventureSchema,
});

export type CreateAdventureResponse = z.infer<
  typeof CreateAdventureResponseSchema
>;
