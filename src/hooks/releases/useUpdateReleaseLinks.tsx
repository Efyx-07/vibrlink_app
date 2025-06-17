import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLink } from '@/services/release.service';
import { Release, Platform } from '@/interfaces/release.interface';

// Hook pour gérer la mise à jour des liens des plateformes d'une release avec React Query
// ===========================================================================================
type UpdateReleaseLinksParams = {
  releaseId: Release['id'];
  newUrls: { [key: Platform['platformId']]: string };
  platformsState: {
    id: Platform['platformId'];
    visibility: Platform['platformVisibility'];
  }[];
};

export function useUpdateReleaseLinks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLink'],
    mutationFn: async ({
      releaseId,
      newUrls,
      platformsState,
    }: UpdateReleaseLinksParams) => {
      const platformsVisibility = platformsState.reduce(
        (acc, platform) => {
          acc[platform.id] = platform.visibility;
          return acc;
        },
        {} as { [key: number]: Platform['platformVisibility'] },
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
