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
    refetch: query.refetch,
  };
}

/**
 * Hook to create card details
 */
export function useCreateCardDetails() {
  const utils = trpc.useUtils();
  const mutation = trpc.cardDetails.createCardDetails.useMutation({
    onSuccess: (_, variables) => {
      // Invalidate the specific card details query after creation
      utils.cardDetails.getActivityDetails.invalidate({ cardId: variables.cardId });
    },
  });

  return {
    createCardDetails: mutation.mutate,
    createCardDetailsAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to update card details
 */
export function useUpdateCardDetails() {
  const utils = trpc.useUtils();
  const mutation = trpc.cardDetails.updateCardDetails.useMutation({
    onSuccess: (_, variables) => {
      // Invalidate the specific card details query after update
      utils.cardDetails.getActivityDetails.invalidate({ cardId: variables.cardId });
    },
  });

  return {
    updateCardDetails: mutation.mutate,
    updateCardDetailsAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
