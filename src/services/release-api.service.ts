import { apiUrl } from '@/constant';
import { Release, Platform } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';

// Service pour fetcher les releases pour un utilisateur (userId). Retourne un tableau de Release
// ===========================================================================================
export async function fetchReleasesData(
  userId: User['id'],
): Promise<Release[]> {
  try {
    const response = await fetch(`${apiUrl}/releasesRoute/releases/${userId}`, {
      credentials: 'include', // Important pour que le cookie soit envoyé (token)
    });

    if (!response.ok) throw new Error('Error while fetching datas');

    const data = await response.json();

    if (!data.formattedReleases) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // convert the visibility values from number to boolean (1 = true, 0 = false)
    data.formattedReleases.forEach((release: Release) => {
      release.platforms.forEach((platform: Platform) => {
        platform.visibility = !!platform.visibility;
      });
    });

    const releases: Release[] = data.formattedReleases;
    return releases;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Error while fetching datas');
  }
}

// Service pour fetcher une release par son slug. Retourne un Release.
// Argument baseUrl:
// Permet un appel direct au backend(backendUrl) si composant SSR ou au proxy(apiUrl) si CSR
// ===========================================================================================
export async function fetchReleaseDataBySlug(
  baseUrl: string,
  releaseSlug: Release['slug'],
): Promise<Release> {
  try {
    const response = await fetch(
      `${baseUrl}/releasesRoute/release/${releaseSlug}`,
    );

    if (!response.ok)
      throw new Error('Error while fetching datas of the release');

    const data = await response.json();

    if (!data.releaseData || data.releaseData.length === 0) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // convert the visibility values from number to boolean (1 = true, 0 = false)
    const releaseData: Release = data.releaseData[0];
    releaseData.platforms.forEach((platform: Platform) => {
      platform.visibility = !!platform.visibility;
    });

    return releaseData;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Error while fetching datas');
  }
}
