import { Release } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';
import { useQuery } from '@tanstack/react-query';
import { fetchReleasesData } from '@/services/release-api.service';

export function useReleases(userId: User['id'] | undefined) {
  return useQuery<Release[]>({
    queryKey: ['releases', userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return fetchReleasesData(userId as number);
    },
    enabled: typeof userId === 'number', // évite l'appel au 1er rendu si userId manquant
  });
}
