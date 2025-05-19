import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLink } from '@/services/release.service';

export function useUpdateReleaseLinks(
  releaseId: number,
  newUrls: { [key: number]: string },
  platformsState: { id: number; visibility: boolean }[],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const platformsVisibility = platformsState.reduce(
        (acc, p) => {
          acc[p.id] = p.visibility;
          return acc;
        },
        {} as { [key: number]: boolean },
      );

      await updateLink(newUrls, platformsVisibility, releaseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', releaseId] });
    },
    onError: (error) => {
      console.error('Update failed:', error);
    },
  });
}
