import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLink } from '@/services/release.service';

// Hook pour gérer la mise à jour des liens des plateformes d'une release avec React Query
// ===========================================================================================
export function useUpdateReleaseLinks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLink'],
    mutationFn: async (params: {
      releaseId: number;
      newUrls: { [key: number]: string };
      platformsState: { id: number; visibility: boolean }[];
    }) => {
      const { releaseId, newUrls, platformsState } = params;
      const platformsVisibility = platformsState.reduce(
        (acc, platform) => {
          acc[platform.id] = platform.visibility;
          return acc;
        },
        {} as { [key: number]: boolean },
      );
      return updateLink(newUrls, platformsVisibility, releaseId);
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({
        queryKey: ['release', variables.releaseId],
      }),
    onError: (error) => console.error('Update failed:', error),
  });
}
