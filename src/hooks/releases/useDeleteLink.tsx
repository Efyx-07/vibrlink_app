import { Release } from '@/interfaces/release.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLinkByReleaseId } from '@/services/release.service';

// Hook pour gérer la suppression d'un lien avec React Query
// ===========================================================================================
export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, Release['id']>({
    mutationFn: (releaseId: Release['id']) => deleteLinkByReleaseId(releaseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['releases'] }),
  });
}
