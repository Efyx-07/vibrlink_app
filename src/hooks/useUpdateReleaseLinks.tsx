import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLink } from '@/services/release.service';
import { Release, Platform } from '@/interfaces/release.interface';

// Hook pour gérer la mise à jour des liens des plateformes d'une release avec React Query
// ===========================================================================================
export function useUpdateReleaseLinks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLink'],
    mutationFn: async (params: {
      releaseId: Release['id'];
      newUrls: { [key: Platform['id']]: string };
      platformsState: {
        id: Platform['id'];
        visibility: Platform['visibility'];
      }[];
    }) => {
      const { releaseId, newUrls, platformsState } = params;
      const platformsVisibility = platformsState.reduce(
        (acc, platform) => {
          acc[platform.id] = platform.visibility;
          return acc;
        },
        {} as { [key: Platform['id']]: Platform['visibility'] },
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
