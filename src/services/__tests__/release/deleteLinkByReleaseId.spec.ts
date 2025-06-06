import { deleteLinkByReleaseId } from '@/services/release.service';
import { apiUrl } from '@/config';

describe('deleteLinkByReleaseId', () => {
  const releaseId = 123;
  const endpoint = `${apiUrl}/releasesRoute/${releaseId}`;

  // Nettoyage après chaque test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test succès : suppression réussie (status ok)
  it('should resolve without error when API response is ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response),
    );

    await expect(deleteLinkByReleaseId(releaseId)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(endpoint, { method: 'DELETE' });
  });

  // Test erreur : suppression échoue avec status non ok
  it('should throw an error with message from response JSON when API response is not ok', async () => {
    const errorMessage = { message: 'Release not found' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(errorMessage),
        statusText: 'Not Found',
      } as Response),
    );

    await expect(deleteLinkByReleaseId(releaseId)).rejects.toThrow(
      'Release not found',
    );
  });

  // Test erreur : fetch rejette la promesse (erreur réseau par exemple)
  it('should throw an error when fetch throws', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure')));

    await expect(deleteLinkByReleaseId(releaseId)).rejects.toThrow(
      'Network failure',
    );
  });
});
