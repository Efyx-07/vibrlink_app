import { fetchReleasesData } from '@/services/release-api.service';
import { apiUrl } from '@/constant';
import { Release } from '@/interfaces/release.interface';

describe('fetchReleasesData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Restaurer les mocks après chaque test pour éviter les effets de bord
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : fetch renvoie correctement les données
  it('should return releases array when API response is valid', async () => {
    const mockReleases: Release[] = [
      {
        id: 1,
        title: 'Test Release',
        artist: 'Artist Name',
        artistId: 'artist-1',
        artistImage: 'image.jpg',
        cover: 'cover.jpg',
        preview: null,
        creationDate: new Date(),
        lastUpdate: new Date(),
        userID: 123,
        slug: 'test-release',
        platforms: [
          {
            platformId: 1,
            platformName: 'Spotify',
            platformLogoUrl: 'logo.png',
            platformActionVerb: 'Listen',
            platformUrl: 'https://spotify.com',
            platformVisibility: true,
          },
          {
            platformId: 2,
            platformName: 'Apple Music',
            platformLogoUrl: 'logo2.png',
            platformActionVerb: 'Play',
            platformUrl: null,
            platformVisibility: false,
          },
        ],
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockReleases),
      } as Response),
    );

    const releases = await fetchReleasesData();
    expect(releases).toHaveLength(1);

    const release = releases[0];
    expect(release.slug).toBe('test-release');
    expect(release.platforms[0].platformVisibility).toBe(true);
    expect(release.platforms[1].platformVisibility).toBe(false);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/releases/user-releases`,
      {
        credentials: 'include',
      },
    );
  });

  // Test erreur : fetch renvoie un status non ok
  it('should throw error when response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(fetchReleasesData()).rejects.toThrow(
      'Error while fetching datas',
    );
  });

  // Test erreur : fetch rejette la promesse (ex : erreur réseau)
  it('should throw error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(fetchReleasesData()).rejects.toThrow('Network error');
  });
});
