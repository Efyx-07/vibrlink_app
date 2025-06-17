import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '@/services/release.service';
import { User } from '@/interfaces/user.interface';
import { SpotifyEntry } from '@/interfaces/spotify.interface';

// Hook pour gérer la création d'un lien avec React Query
// ===========================================================================================
type CreateLinkParams = {
  spotifyAlbumUrl: SpotifyEntry['albumUrl'];
  userId: User['id'] | undefined;
};

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createLink'],
    mutationFn: async ({ spotifyAlbumUrl, userId }: CreateLinkParams) => {
      return createLink(spotifyAlbumUrl, userId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['releases'] }),
  });
}
