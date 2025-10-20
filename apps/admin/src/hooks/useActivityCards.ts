import { trpc } from "../utils/trpc";

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
    { enabled: id > 0 },
  );

  return {
    activityCard: query.data?.card,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to create an activity card
 */
export function useCreateActivityCard() {
  const utils = trpc.useUtils();
  const mutation = trpc.activityCard.createActivityCard.useMutation({
    onSuccess: () => {
      // Invalidate and refetch activity cards after creation
      utils.activityCard.getAllActivityCards.invalidate();
    },
  });

  return {
    createActivityCard: mutation.mutate,
    createActivityCardAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
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

/**
 * Hook to delete an activity card
 */
export function useDeleteActivityCard() {
  const utils = trpc.useUtils();
  const mutation = trpc.activityCard.deleteActivityCard.useMutation({
    onSuccess: () => {
      // Invalidate and refetch activity cards after deletion
      utils.activityCard.getAllActivityCards.invalidate();
    },
  });

  return {
    deleteActivityCard: mutation.mutate,
    deleteActivityCardAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
