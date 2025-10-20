import { trpc } from "../utils/trpc";

/**
 * Hook to fetch all club members
 */
export function useClubMembers() {
  const query = trpc.clubMember.getAllClubMembers.useQuery({});

  return {
    clubMembers: query.data?.members ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to fetch a single club member by ID
 */
export function useClubMember(id: number) {
  const query = trpc.clubMember.getClubMember.useQuery(
    { id },
    { enabled: id > 0 },
  );

  return {
    clubMember: query.data?.member,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to create a club member
 */
export function useCreateClubMember() {
  const utils = trpc.useUtils();
  const mutation = trpc.clubMember.createClubMember.useMutation({
    onSuccess: () => {
      // Invalidate and refetch club members after creation
      utils.clubMember.getAllClubMembers.invalidate();
    },
  });

  return {
    createClubMember: mutation.mutate,
    createClubMemberAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to update a club member
 */
export function useUpdateClubMember() {
  const utils = trpc.useUtils();
  const mutation = trpc.clubMember.updateClubMember.useMutation({
    onSuccess: () => {
      // Invalidate and refetch club members after update
      utils.clubMember.getAllClubMembers.invalidate();
    },
  });

  return {
    updateClubMember: mutation.mutate,
    updateClubMemberAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook to delete a club member
 */
export function useDeleteClubMember() {
  const utils = trpc.useUtils();
  const mutation = trpc.clubMember.deleteClubMember.useMutation({
    onSuccess: () => {
      // Invalidate and refetch club members after deletion
      utils.clubMember.getAllClubMembers.invalidate();
    },
  });

  return {
    deleteClubMember: mutation.mutate,
    deleteClubMemberAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
