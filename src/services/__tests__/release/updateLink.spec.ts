import { updateLink } from '@/services/release.service';
import { apiUrl } from '@/constant';

describe('updateLink', () => {
  const releaseId = 123;
  const endpoint = `${apiUrl}/releasesRoute/${releaseId}`;
  const newUrls = {
    spotify: 'https://open.spotify.com/album/xyz',
    apple: 'https://music.apple.com/album/abc',
  };
  const platformsVisibility = {
    spotify: 1,
    apple: 0,
  };

  // Nettoyage après chaque test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : la mise à jour est effectuée correctement
  it('should return message when API response is ok', async () => {
    const mockMessage = { message: 'Update successful' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMessage),
      } as Response),
    );

    const result = await updateLink(newUrls, platformsVisibility, releaseId);

    expect(result).toEqual(mockMessage);
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUrls, platformsVisibility }),
    });
  });

  // Test erreur : réponse HTTP non OK
  it('should throw error when API response is not ok', async () => {
    const mockErrorMessage = { message: 'Invalid input data' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockErrorMessage),
        statusText: 'Bad Request',
      } as Response),
    );

    await expect(
      updateLink(newUrls, platformsVisibility, releaseId),
    ).rejects.toThrow('Invalid input data');
  });

  // Test erreur : fetch rejette la promesse
  it('should throw error when fetch throws', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(
      updateLink(newUrls, platformsVisibility, releaseId),
    ).rejects.toThrow('Network error');
  });
});
