import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "@ultimate-adventure/backend-utils";
import { appRouter } from "./trpc";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "web-server" });
});

// tRPC routes
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => {
  console.log(`✓ Web server listening on port ${port}`);
  console.log(`✓ Health check: http://localhost:${port}/health`);
  console.log(`✓ tRPC endpoints available at http://localhost:${port}/trpc`);
  console.log(`  - adventure: getAdventure, listAdventures, createAdventure`);
  console.log(
    `  - activityCard: getActivityCard, getAllActivityCards, updateActivityCard`,
  );
});
