import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "@ultimate-adventure/backend-utils";
import { appRouter } from "./trpc.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const nodeEnv = process.env.NODE_ENV || "development";

// Configure CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "admin-server" });
});

// tRPC routes
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// For local development, start the server
// For production (Vercel), just export the app
if (nodeEnv !== "production") {
  app.listen(port, () => {
    console.log(`✓ Admin server listening on port ${port}`);
    console.log(`✓ Environment: ${nodeEnv}`);
    console.log(`✓ Health check: http://localhost:${port}/health`);
    console.log(`✓ tRPC endpoints available at http://localhost:${port}/trpc`);
    console.log(`  - adventure: getAdventure, listAdventures, createAdventure`);
  });
}

// Export for Vercel serverless
export default app;
