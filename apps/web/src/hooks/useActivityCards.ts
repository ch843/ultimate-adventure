import { trpc } from '../utils/trpc';

/**
 * Hook to fetch all activity cards
 */
export function useActivityCards() {
  const query = trpc.activityCard.getAllActivityCards.useQuery({});

  return {
    activityCards: query.data?.cards ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

/**
 * Hook to fetch a single activity card by ID
 */
export function useActivityCard(id: number) {
  const query = trpc.activityCard.getActivityCard.useQuery(
    { id },
    { enabled: id > 0 }
  );

  return {
    activityCard: query.data?.card,
    isLoading: query.isLoading,
    error: query.error,
  };
}
