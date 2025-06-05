import { apiUrl, backendUrl } from '@/config';
import { Release, Platform } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';
import { isRunningOnServer } from '@/utils/isRunningOnServer';

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
  } catch (error) {
    console.error('Error while fetching datas', error);
    throw error;
  }
}

// Service pour fetcher une release par son slug. Retourne un Release.
// ===========================================================================================
export async function fetchReleaseDataBySlug(
  releaseSlug: Release['slug'],
): Promise<Release> {
  try {
    // Définit si le composant qui utilise le service est SSR ou CSR
    // Si server, passe l'url du backend sinon passe par le proxy (apiUrl)
    const baseUrl = isRunningOnServer() ? backendUrl : apiUrl;

    if (!baseUrl) throw new Error('Base URL is undefined');

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
  } catch (error) {
    console.error('Error while fetching datas', error);
    throw error;
  }
}
