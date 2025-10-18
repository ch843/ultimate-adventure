import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Validates a request using a Zod schema and throws a TRPCError if validation fails
 */
export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Validation failed: ${messages.join(', ')}`,
        cause: error,
      });
    }
    throw error;
  }
}
