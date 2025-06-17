import { apiUrl } from '@/constant';
import { SpotifyEntry } from '@/interfaces/spotify.interface';
import {
  Platform,
  ReleaseResponse,
  Release,
} from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';

// Service pour la création d'un lien. Retourne le slug qui servira pour la redirection.
// ===========================================================================================
export async function createLink(
  spotifyAlbumUrl: SpotifyEntry['albumUrl'],
  userId: User['id'] | undefined,
): Promise<{ releaseSlug: ReleaseResponse['releaseSlug'] }> {
  try {
    const response = await fetch(`${apiUrl}/releases/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spotifyAlbumUrl, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: ReleaseResponse = await response.json();
    return { releaseSlug: data.releaseSlug };
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during sending album URL');
  }
}

// Service pour la suppression définitive d'un lien (app et base de donnée)
// ===========================================================================================
export async function deleteLinkByReleaseId(
  releaseId: ReleaseResponse['releaseId'],
): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/releases/${releaseId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    return;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to delete release');
  }
}

// Service mettre à jour un lien, retourne un message de succès
// ===========================================================================================
export async function updateLink(
  newUrls: { [key: Platform['platformId']]: string },
  platformsVisibility: {
    [key: Platform['platformId']]: Platform['platformVisibility'];
  },
  releaseId: Release['id'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${apiUrl}/releases/${releaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newUrls, platformsVisibility }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: { message: string } = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to update release');
  }
}
