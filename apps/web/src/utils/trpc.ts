import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../web-server/src/trpc";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();
