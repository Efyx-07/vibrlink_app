import { logoutUserApi } from '@/services/user.service';
import { apiUrl } from '@/constant';

// Test de la fonction logoutUserApi
// ===========================================================================================
describe('logoutUserApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : retourne un message de succès après déconnexion
  it('should return success message on successful logout', async () => {
    const mockResponse = { message: 'Logout successful' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await logoutUserApi();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/users/logout`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );
  });

  // Test erreur : l'API renvoie un message d'erreur explicite
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Logout failed';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
        statusText: 'Bad Request',
      } as Response),
    );

    await expect(logoutUserApi()).rejects.toThrow(errorMessage);
  });

  // Test erreur : l'API ne renvoie pas de message dans le JSON, on utilise statusText
  it('should throw error with statusText if API does not send message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject('fail'),
        statusText: 'Service Unavailable',
      } as Response),
    );

    await expect(logoutUserApi()).rejects.toThrow('Service Unavailable');
  });

  // Test erreur : échec réseau ou autre erreur non prévue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(logoutUserApi()).rejects.toThrow('Network error');
  });
});
