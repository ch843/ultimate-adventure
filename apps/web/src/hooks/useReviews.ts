import { trpc } from "../utils/trpc";

/**
 * Hook to fetch all reviews
 * 
 */
export function useReviews() {
  const query = trpc.reviews.getAllReviews.useQuery({});

  return {
    reviewData: query.data?.filter((review) => review.published),
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}