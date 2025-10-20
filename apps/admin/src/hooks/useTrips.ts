import { trpc } from "../utils/trpc";

/**
 * Hook to fetch all trips
 */
export function useTrips() {
  const query = trpc.trip.getAllTrips.useQuery({});

  return {
    trips: query.data?.trips ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to fetch a single trip by ID
 */
export function useTrip(id: number) {
  const query = trpc.trip.getTrip.useQuery({ id }, { enabled: id > 0 });

  return {
    trip: query.data?.trip,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to create a trip
 */
export function useCreateTrip() {
  const utils = trpc.useUtils();
  const mutation = trpc.trip.createTrip.useMutation({
    onSuccess: () => {
      // Invalidate and refetch trips after creation
      utils.trip.getAllTrips.invalidate();
    },
  });

  return {
    createTrip: mutation.mutate,
    createTripAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to update a trip
 */
export function useUpdateTrip() {
  const utils = trpc.useUtils();
  const mutation = trpc.trip.updateTrip.useMutation({
    onSuccess: () => {
      // Invalidate and refetch trips after update
      utils.trip.getAllTrips.invalidate();
    },
  });

  return {
    updateTrip: mutation.mutate,
    updateTripAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to delete a trip
 */
export function useDeleteTrip() {
  const utils = trpc.useUtils();
  const mutation = trpc.trip.deleteTrip.useMutation({
    onSuccess: () => {
      // Invalidate and refetch trips after deletion
      utils.trip.getAllTrips.invalidate();
    },
  });

  return {
    deleteTrip: mutation.mutate,
    deleteTripAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
