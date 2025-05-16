import { apiUrl } from '@/config';
import { Release } from '@/interfaces/release.interface';
import { User } from '@/interfaces/user.interface';

// Service pour la création d'un lien. Retourne le slug qui servira pour la redirection
// ===========================================================================================
export async function createLink(
  albumUrl: string,
  userId: User['id'] | undefined,
): Promise<{ releaseSlug: Release['slug'] }> {
  try {
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
      const data: Release['slug'] = await response.json();
      return { releaseSlug: data };
    } else {
      throw new Error('Failed to send album URL' + response.statusText);
    }
  } catch (error) {
    throw new Error('Failed to send album URL' + error);
  }
}
