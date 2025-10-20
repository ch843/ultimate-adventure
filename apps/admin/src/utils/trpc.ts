import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../admin-server/src/trpc";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();
