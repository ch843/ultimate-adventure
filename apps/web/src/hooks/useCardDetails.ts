import { trpc } from '../utils/trpc';

/**
 * Hook to fetch card details by card ID
 */
export function useCardDetails(cardId: number) {
  const query = trpc.cardDetails.getActivityDetails.useQuery(
    { cardId },
    { enabled: cardId > 0 }
  );

  return {
    cardDetails: query.data?.details,
    isLoading: query.isLoading,
    error: query.error,
  };
}
