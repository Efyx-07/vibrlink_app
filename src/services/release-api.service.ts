import { apiUrl } from '@/config';
import { Release, Platform } from '@/interfaces/release.interface';
import { getAuthTokenFromLocalStorage } from '@/utils/getTokenFromLocalStorage';

// Service pour fetcher les releases pour un utilisateur (userId). Retourne un tableau de Release
// ===========================================================================================
export async function fetchReleasesData(userId: number): Promise<Release[]> {
  try {
    const token = getAuthTokenFromLocalStorage();
    if (!token) throw new Error('No auth token found');

    const response = await fetch(`${apiUrl}/releasesRoute/releases/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
