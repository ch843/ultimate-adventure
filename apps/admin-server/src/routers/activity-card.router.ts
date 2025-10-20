import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetActivityCardRequestSchema,
  GetAllActivityCardsRequestSchema,
  CreateActivityCardRequestSchema,
  UpdateActivityCardRequestSchema,
  DeleteActivityCardRequestSchema,
} from "@ultimate-adventure/shared-models";
import { activityCardService } from "../services/activity-card.service";

export const activityCardRouter = router({
  getActivityCard: publicProcedure
    .input(GetActivityCardRequestSchema)
    .query(({ input }) => activityCardService.getActivityCard(input)),

  getAllActivityCards: publicProcedure
    .input(GetAllActivityCardsRequestSchema)
    .query(({ input }) => activityCardService.getAllActivityCards(input)),

  createActivityCard: publicProcedure
    .input(CreateActivityCardRequestSchema)
    .mutation(({ input }) => activityCardService.createActivityCard(input)),

  updateActivityCard: publicProcedure
    .input(UpdateActivityCardRequestSchema)
    .mutation(({ input }) => activityCardService.updateActivityCard(input)),

  deleteActivityCard: publicProcedure
    .input(DeleteActivityCardRequestSchema)
    .mutation(({ input }) => activityCardService.deleteActivityCard(input)),
});

export type ActivityCardRouter = typeof activityCardRouter;
