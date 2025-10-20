import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

/**
 * Context for tRPC requests
 * This can be extended with auth, database connections, etc.
 */
export interface Context {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
}

/**
 * Create context for tRPC from Express request/response
 */
export const createContext = (opts: CreateExpressContextOptions): Context => {
  return {
    req: opts.req,
    res: opts.res,
  };
};

/**
 * Initialize tRPC with context
 */
const t = initTRPC.context<Context>().create();

/**
 * Export tRPC router and procedure builders
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Helper to create a validated procedure with Zod schema
 * Note: This is just an alias for publicProcedure.input() for convenience
 */
export function validatedProcedure<TInput extends z.ZodType>(
  inputSchema: TInput,
): ReturnType<typeof publicProcedure.input<TInput>> {
  return publicProcedure.input(inputSchema);
}

/**
 * Custom error handler for tRPC that works with Zod
 */
export function handleTRPCError(error: unknown): never {
  if (error instanceof z.ZodError) {
    const messages = error.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`,
    );
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Validation failed: ${messages.join(", ")}`,
      cause: error,
    });
  }

  if (error instanceof Error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
      cause: error,
    });
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unknown error occurred",
  });
}
