import { Release } from '@/interfaces/release.interface';
import { useQuery } from '@tanstack/react-query';
import { fetchReleaseDataBySlug } from '@/services/release-api.service';

export function useRelease(releaseSlug: Release['slug'] | undefined) {
  return useQuery<Release>({
    queryKey: ['release', releaseSlug],
    queryFn: () => fetchReleaseDataBySlug(releaseSlug as Release['slug']),
    enabled: typeof releaseSlug === 'string', // évite l'appel au 1er rendu si releaseSlug manquant
  });
}
