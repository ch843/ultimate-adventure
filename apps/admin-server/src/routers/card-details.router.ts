import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import {
  GetActivityDetailsRequestSchema,
  CreateCardDetailsRequestSchema,
  UpdateCardDetailsRequestSchema,
} from "@ultimate-adventure/shared-models";
import { cardDetailsService } from "../services/card-details.service";

export const cardDetailsRouter = router({
  getActivityDetails: publicProcedure
    .input(GetActivityDetailsRequestSchema)
    .query(({ input }) => cardDetailsService.getActivityDetails(input)),

  createCardDetails: publicProcedure
    .input(CreateCardDetailsRequestSchema)
    .mutation(({ input }) => cardDetailsService.createCardDetails(input)),

  updateCardDetails: publicProcedure
    .input(UpdateCardDetailsRequestSchema)
    .mutation(({ input }) => cardDetailsService.updateCardDetails(input)),
});

export type CardDetailsRouter = typeof cardDetailsRouter;
