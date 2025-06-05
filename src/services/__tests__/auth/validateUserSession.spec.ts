import { validateUserSession } from '@/services/auth.service';
import { apiUrl } from '@/config';

describe('validateUserSession', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : la session est valide, la fonction ne renvoie rien
  it('should resolve without error if session is valid', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response),
    );

    await expect(validateUserSession()).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(`${apiUrl}/user/me`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  // Test échec : réponse non ok, la fonction rejette avec une erreur
  it('should throw error if token is invalid or absent', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(validateUserSession()).rejects.toThrow(
      'Token invalide ou absent',
    );
  });

  // Test échec réseau ou erreur inconnue
  it('should throw error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(validateUserSession()).rejects.toThrow('Network error');
  });
});
