import type {
  ReviewInfo,
  CreateReviewRequest,
} from "@ultimate-adventure/shared-models";
import { ReviewsDAO } from "@ultimate-adventure/backend-utils"

export const reviewService = {
  async getAllReviews(): Promise<ReviewInfo[]> {
    return await ReviewsDAO.getAllReviews();
  },

  async createReview(request: CreateReviewRequest,): Promise<ReviewInfo> {
    return await ReviewsDAO.createReview(request)
  }
};
