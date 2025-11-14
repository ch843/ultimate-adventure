import { router, publicProcedure } from "@ultimate-adventure/backend-utils";
import { CreateReviewRequestSchema, GetReviewInfoRequestSchema } from "@ultimate-adventure/shared-models";
import { reviewService } from "../services/review.service.js"

export const reviewRouter = router({
  getAllReviews: publicProcedure
    .input(GetReviewInfoRequestSchema)
    .query(({ }) => reviewService.getAllReviews()),
  
  createReview: publicProcedure
    .input(CreateReviewRequestSchema)
    .mutation(({ input }) => reviewService.createReview(input)),
});

export type ReviewRouter = typeof reviewRouter;
