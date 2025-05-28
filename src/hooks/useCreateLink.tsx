import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '@/services/release.service';
import { User } from '@/interfaces/user.interface';
import { SpotifyEntry } from '@/interfaces/spotify.interface';

// Hook pour gérer la création d'un lien avec React Query
// ===========================================================================================
type CreateLinkParams = {
  albumUrl: SpotifyEntry['albumUrl'];
  userId: User['id'] | undefined;
};

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createLink'],
    mutationFn: async ({ albumUrl, userId }: CreateLinkParams) => {
      return createLink(albumUrl, userId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['releases'] }),
  });
}
