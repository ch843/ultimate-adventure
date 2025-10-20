import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetAdventureRequestSchema,
  ListAdventuresRequestSchema,
  CreateAdventureRequestSchema,
} from "@ultimate-adventure/shared-models";
import { adventureService } from "../services/adventure.service";

export const adventureRouter = router({
  getAdventure: publicProcedure
    .input(GetAdventureRequestSchema)
    .query(({ input }) => adventureService.getAdventure(input)),

  listAdventures: publicProcedure
    .input(ListAdventuresRequestSchema)
    .query(({ input }) => adventureService.listAdventures(input)),

  createAdventure: publicProcedure
    .input(CreateAdventureRequestSchema)
    .mutation(({ input }) => adventureService.createAdventure(input)),
});

export type AdventureRouter = typeof adventureRouter;
