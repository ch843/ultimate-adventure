import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetActivityCardRequestSchema,
  GetAllActivityCardsRequestSchema,
  UpdateActivityCardRequestSchema,
} from "@ultimate-adventure/shared-models";
import { activityCardService } from "../services/activity-card.service";

export const activityCardRouter = router({
  getActivityCard: publicProcedure
    .input(GetActivityCardRequestSchema)
    .query(({ input }) => activityCardService.getActivityCard(input)),

  getAllActivityCards: publicProcedure
    .input(GetAllActivityCardsRequestSchema)
    .query(({ input }) => activityCardService.getAllActivityCards(input)),

  updateActivityCard: publicProcedure
    .input(UpdateActivityCardRequestSchema)
    .mutation(({ input }) => activityCardService.updateActivityCard(input)),
});

export type ActivityCardRouter = typeof activityCardRouter;
