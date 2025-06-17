import { apiUrl } from '@/constant';
import { Release, Platform } from '@/interfaces/release.interface';

// Service pour fetcher les releases pour un utilisateur (userId récupéré dans le token).
// Retourne un tableau de Release.
// ===========================================================================================
export async function fetchReleasesData(): Promise<Release[]> {
  try {
    const response = await fetch(`${apiUrl}/releases/user-releases`, {
      credentials: 'include', // Important pour que le cookie soit envoyé (token)
    });

    if (!response.ok) throw new Error('Error while fetching datas');

    const releases = await response.json();
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
    const response = await fetch(`${baseUrl}/releases/${releaseSlug}`);

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
