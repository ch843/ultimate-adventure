import { z } from 'zod';

// Trip Schema
export const TripSchema = z.object({
  id: z.number(),
  title: z.string(),
  location: z.string(),
  date_start: z.string(),
  date_end: z.string(),
  group_num: z.number(),
});

export type Trip = z.infer<typeof TripSchema>;

// RPC Schemas for Trips
export const GetTripRequestSchema = z.object({
  id: z.number(),
});

export type GetTripRequest = z.infer<typeof GetTripRequestSchema>;

export const GetTripResponseSchema = z.object({
  trip: TripSchema,
});

export type GetTripResponse = z.infer<typeof GetTripResponseSchema>;

export const GetAllTripsRequestSchema = z.object({});

export type GetAllTripsRequest = z.infer<typeof GetAllTripsRequestSchema>;

export const GetAllTripsResponseSchema = z.object({
  trips: z.array(TripSchema),
});

export type GetAllTripsResponse = z.infer<typeof GetAllTripsResponseSchema>;

export const CreateTripRequestSchema = z.object({
  data: TripSchema.omit({ id: true }),
});

export type CreateTripRequest = z.infer<typeof CreateTripRequestSchema>;

export const CreateTripResponseSchema = z.object({
  trip: TripSchema,
});

export type CreateTripResponse = z.infer<typeof CreateTripResponseSchema>;

export const UpdateTripRequestSchema = z.object({
  id: z.number(),
  data: TripSchema.partial().omit({ id: true }),
});

export type UpdateTripRequest = z.infer<typeof UpdateTripRequestSchema>;

export const UpdateTripResponseSchema = z.object({
  success: z.boolean(),
});

export type UpdateTripResponse = z.infer<typeof UpdateTripResponseSchema>;

export const DeleteTripRequestSchema = z.object({
  id: z.number(),
});

export type DeleteTripRequest = z.infer<typeof DeleteTripRequestSchema>;

export const DeleteTripResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteTripResponse = z.infer<typeof DeleteTripResponseSchema>;
