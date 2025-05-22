import { Release } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReleasesData } from '@/services/release-api.service';
import { useEffect } from 'react';

export function useReleases(userId: User['id'] | undefined) {
  const queryClient = useQueryClient();
  // Re-fetch si userId devient dispo après le premier rendu
  useEffect(() => {
    if (typeof userId === 'number') {
      void queryClient.invalidateQueries({ queryKey: ['releases', userId] });
    }
  }, [userId, queryClient]);

  return useQuery<Release[]>({
    queryKey: ['releases', userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return fetchReleasesData(userId as User['id']);
    },
    enabled: typeof userId === 'number', // évite l'appel au 1er rendu si userId manquant
  });
}
