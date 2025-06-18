import { fetchReleaseDataBySlug } from '@/services/release-api.service';

const mockBaseUrl: string = 'backendUrl';

describe('fetchReleaseDataBySlug', () => {
  const slug = 'test-release';

  // Restaurer les mocks après chaque test pour éviter les effets de bord
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : fetch renvoie un objet release correctement formaté
  it('should return a formatted release object when API response is valid', async () => {
    const mockResponse = {
      releaseData: [
        {
          id: 'release1',
          slug: 'test-release',
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

    const release = await fetchReleaseDataBySlug(mockBaseUrl, slug);

    expect(release).toBeDefined();
    expect(release.slug).toBe('test-release');
    expect(release.platforms[0].platformVisibility).toBe(true);
    expect(release.platforms[1].platformVisibility).toBe(false);
    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/releasesRoute/release/${slug}`,
    );
  });

  // Test erreur : fetch renvoie un status non ok
  it('should throw an error when response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(fetchReleaseDataBySlug(mockBaseUrl, slug)).rejects.toThrow(
      'Error while fetching datas of the release',
    );
  });

  // Test erreur : données reçues sans la propriété releaseData ou releaseData vide
  it('should throw an error when releaseData is missing or empty', async () => {
    const invalidResponse = { releaseData: [] };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(invalidResponse),
      } as Response),
    );

    await expect(fetchReleaseDataBySlug(mockBaseUrl, slug)).rejects.toThrow(
      'Invalid response format',
    );
  });

  // Test erreur : fetch rejette la promesse (ex : erreur réseau)
  it('should throw an error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(fetchReleaseDataBySlug(mockBaseUrl, slug)).rejects.toThrow(
      'Network error',
    );
  });
});
