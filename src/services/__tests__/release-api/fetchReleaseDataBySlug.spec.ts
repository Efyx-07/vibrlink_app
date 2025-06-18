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
    const mockRelease = {
      id: 1,
      slug: 'test-release',
      platforms: [
        { platformId: 1, platformVisibility: true },
        { platformId: 2, platformVisibility: false },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRelease),
      } as Response),
    );

    const release = await fetchReleaseDataBySlug(mockBaseUrl, slug);

    expect(release).toBeDefined();
    expect(release.slug).toBe('test-release');
    expect(release.platforms[0].platformVisibility).toBe(true);
    expect(release.platforms[1].platformVisibility).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/releases/${slug}`,
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

  // Test erreur : fetch rejette la promesse (ex : erreur réseau)
  it('should throw an error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(fetchReleaseDataBySlug(mockBaseUrl, slug)).rejects.toThrow(
      'Network error',
    );
  });
});
