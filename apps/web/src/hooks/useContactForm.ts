import { trpc } from '../utils/trpc';

/**
 * Hook to submit contact form
 */
export function useSubmitContactForm() {
  const mutation = trpc.contactForm.submit.useMutation();

  return {
    submitContactForm: mutation.mutate,
    submitContactFormAsync: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
