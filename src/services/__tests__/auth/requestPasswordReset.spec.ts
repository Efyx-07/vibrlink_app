import { requestPasswordReset } from '@/services/auth.service';
import { apiUrl } from '@/config';

// Test de la fonction requestPasswordReset
// ===========================================================================================
describe('requestPasswordReset', () => {
  const email = 'test@example.com';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : retourne un message de succès après demande de réinitialisation
  it('should return success message on successful password reset request', async () => {
    const mockResponse = { message: 'Password reset email sent' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await requestPasswordReset(email);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/passwordRoute/forgot-password`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }),
    );
  });

  // Test erreur : l'API renvoie un message d'erreur explicite
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Email not registered';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
        statusText: 'Bad Request',
      } as Response),
    );

    await expect(requestPasswordReset(email)).rejects.toThrow(errorMessage);
  });

  // Test erreur : l'API ne renvoie pas de message, on utilise statusText
  it('should throw error with statusText if API does not send message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject('fail'),
        statusText: 'Internal Server Error',
      } as Response),
    );

    await expect(requestPasswordReset(email)).rejects.toThrow(
      'Internal Server Error',
    );
  });

  // Test erreur : échec réseau ou erreur inconnue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(requestPasswordReset(email)).rejects.toThrow('Network error');
  });
});
