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
    refetch: query.refetch,
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
    refetch: query.refetch,
  };
}

/**
 * Hook to update an activity card
 */
export function useUpdateActivityCard() {
  const utils = trpc.useUtils();
  const mutation = trpc.activityCard.updateActivityCard.useMutation({
    onSuccess: () => {
      // Invalidate and refetch activity cards after update
      utils.activityCard.getAllActivityCards.invalidate();
    },
  });

  return {
    updateActivityCard: mutation.mutate,
    updateActivityCardAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
