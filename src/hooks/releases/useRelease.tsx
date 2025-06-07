import { Release } from '@/interfaces/release.interface';
import { useQuery } from '@tanstack/react-query';
import { fetchReleaseDataBySlug } from '@/services/release-api.service';

// Hook pour gérer le fetch d'une release par son slug avec React Query
// ===========================================================================================
export function useRelease(
  baseUrl: string,
  releaseSlug: Release['slug'] | undefined,
) {
  return useQuery<Release>({
    queryKey: ['release', releaseSlug],
    queryFn: () =>
      fetchReleaseDataBySlug(baseUrl, releaseSlug as Release['slug']),
    enabled: typeof releaseSlug === 'string', // évite l'appel au 1er rendu si releaseSlug manquant
  });
}
