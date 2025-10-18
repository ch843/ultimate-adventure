import { z } from 'zod';

// Contact Form Schema
export const ContactFormInfoSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(14).nullable(),
  activity_inquiry_id: z.number().nullable(),
  message: z.string(),
  created_at: z.string().datetime(),
});

export type ContactFormInfo = z.infer<typeof ContactFormInfoSchema>;

// RPC Schemas for Contact Form
export const SubmitContactFormRequestSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10).max(14).nullable(),
  activity_inquiry_id: z.number().nullable(),
  message: z.string().min(1),
});

export type SubmitContactFormRequest = z.infer<typeof SubmitContactFormRequestSchema>;

export const SubmitContactFormResponseSchema = z.object({
  success: z.boolean(),
  id: z.number(),
});

export type SubmitContactFormResponse = z.infer<typeof SubmitContactFormResponseSchema>;
