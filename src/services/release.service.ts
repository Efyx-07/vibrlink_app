import { apiUrl } from '@/config';
import { ReleaseResponse } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';

// Service pour la création d'un lien. Retourne le slug qui servira pour la redirection
// ===========================================================================================
export async function createLink(
  albumUrl: string,
  userId: User['id'] | undefined,
): Promise<{ releaseSlug: ReleaseResponse['releaseSlug'] }> {
  try {
    console.log('Sending album URL:', albumUrl, 'for user ID:', userId);
    const response = await fetch(
      `${apiUrl}/releasesRoute/getReleaseSpotifyUrl`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ albumUrl, userId }),
      },
    );

    if (response.ok) {
      const data: ReleaseResponse = await response.json();
      return { releaseSlug: data.releaseSlug };
    } else {
      throw new Error('Failed to send album URL' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to send album URL' + error);
  }
}

// Service pour la suppression définitive d'un lien (app et base de donnée)
// ===========================================================================================
export async function deleteLinkByReleaseId(
  releaseId: ReleaseResponse['releaseId'],
): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/releasesRoute/${releaseId}`, {
      method: 'DELETE',
    });
    if (response.ok) return;
    else throw new Error('Failed to delete release' + response.statusText);
  } catch (error) {
    throw new Error('Failed to delete release' + error);
  }
}
