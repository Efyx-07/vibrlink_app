import { fetchReleasesData } from '@/services/release-api.service';
import { apiUrl } from '@/config';

describe('fetchReleasesData', () => {
  const userId = 123;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Restaurer les mocks après chaque test pour éviter les effets de bord
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : fetch renvoie des données correctement formatées
  it('should return formatted releases array when API response is valid', async () => {
    const mockResponse = {
      formattedReleases: [
        {
          id: 'release1',
          platforms: [
            { id: 'platform1', visibility: 1 },
            { id: 'platform2', visibility: 0 },
          ],
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const releases = await fetchReleasesData(userId);
    expect(releases).toHaveLength(1);
    expect(releases[0].platforms[0].visibility).toBe(true);
    expect(releases[0].platforms[1].visibility).toBe(false);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/releasesRoute/releases/${userId}`,
      { credentials: 'include' },
    );
  });

  // Test erreur : fetch renvoie un status non ok
  it('should throw error when response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(fetchReleasesData(userId)).rejects.toThrow(
      'Error while fetching datas',
    );
  });

  // Test erreur : données reçues sans la propriété formattedReleases
  it('should throw error when response data does not contain formattedReleases', async () => {
    const invalidResponse = { wrongKey: [] };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(invalidResponse),
      } as Response),
    );

    await expect(fetchReleasesData(userId)).rejects.toThrow(
      'Invalid response format',
    );
  });

  // Test erreur : fetch rejette la promesse (ex : erreur réseau)
  it('should throw error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(fetchReleasesData(userId)).rejects.toThrow('Network error');
  });
});
