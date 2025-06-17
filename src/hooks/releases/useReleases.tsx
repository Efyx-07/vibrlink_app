import { Release } from '@/interfaces/release.interface';
import { useQuery } from '@tanstack/react-query';
import { fetchReleasesData } from '@/services/release-api.service';

// Hook pour récupérer les releases de l'utilisateur connecté
// ==========================================================
export function useReleases() {
  return useQuery<Release[]>({
    queryKey: ['releases'],
    queryFn: fetchReleasesData,
  });
}
