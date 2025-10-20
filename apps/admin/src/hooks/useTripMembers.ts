import { trpc } from "../utils/trpc";

/**
 * Hook to fetch trip members by trip ID
 */
export function useTripMembersByTripId(tripId: number) {
  const query = trpc.tripMember.getTripMembersByTripId.useQuery(
    { tripId },
    { enabled: tripId > 0 },
  );

  return {
    tripMembers: query.data?.tripMembers ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to create a trip member
 */
export function useCreateTripMember() {
  const utils = trpc.useUtils();
  const mutation = trpc.tripMember.createTripMember.useMutation({
    onSuccess: () => {
      // Invalidate and refetch trip members after creation
      utils.tripMember.getTripMembersByTripId.invalidate();
    },
  });

  return {
    createTripMember: mutation.mutate,
    createTripMemberAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to delete a trip member
 */
export function useDeleteTripMember() {
  const utils = trpc.useUtils();
  const mutation = trpc.tripMember.deleteTripMember.useMutation({
    onSuccess: () => {
      // Invalidate and refetch trip members after deletion
      utils.tripMember.getTripMembersByTripId.invalidate();
    },
  });

  return {
    deleteTripMember: mutation.mutate,
    deleteTripMemberAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
