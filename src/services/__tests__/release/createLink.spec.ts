import { createLink } from '@/services/release.service';
import { apiUrl } from '@/config';

describe('createLink', () => {
  const albumUrl = 'https://open.spotify.com/album/test';
  const userId = 42;
  const endpoint = `${apiUrl}/releasesRoute/getReleaseSpotifyUrl`;

  // Restaurer les mocks après chaque test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : fetch renvoie un slug correctement
  it('should return the releaseSlug when API response is valid', async () => {
    const mockResponse = { releaseSlug: 'test-slug' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const result = await createLink(albumUrl, userId);

    expect(result).toEqual({ releaseSlug: 'test-slug' });
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ albumUrl, userId }),
    });
  });

  // Test erreur : fetch renvoie un status non ok + message d’erreur dans la réponse
  it('should throw an error with message from error response', async () => {
    const mockErrorResponse = { message: 'Invalid album URL' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockErrorResponse),
        statusText: 'Bad Request',
      } as Response),
    );

    await expect(createLink(albumUrl, userId)).rejects.toThrow(
      'Invalid album URL',
    );
  });

  // Test erreur : fetch renvoie un status non ok + réponse sans JSON valide
  it('should throw an error with fallback message if no error message in response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject('Invalid JSON'),
        statusText: 'Bad Request',
      } as Response),
    );

    await expect(createLink(albumUrl, userId)).rejects.toThrow('Bad Request');
  });

  // Test erreur : fetch rejette la promesse (ex : erreur réseau)
  it('should throw an error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(createLink(albumUrl, userId)).rejects.toThrow('Network error');
  });

  // Test erreur : fetch renvoie une erreur inconnue (non instance d’Error)
  it('should throw a generic error if caught error is not an instance of Error', async () => {
    global.fetch = jest.fn(() => {
      // simulate non-Error rejection
      return Promise.reject('Something went wrong');
    });

    await expect(createLink(albumUrl, userId)).rejects.toThrow(
      'Unknown error during sending album URL',
    );
  });
});
