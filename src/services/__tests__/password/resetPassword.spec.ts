import { resetPassword } from '@/services/password.service';
import { apiUrl } from '@/constant';

// Test de la fonction resetPassword
// ===========================================================================================
describe('resetPassword', () => {
  const token = 'valid-reset-token';
  const newPassword = 'NewPassword123!';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : retourne un message de succès après réinitialisation du mot de passe
  it('should return success message on successful password reset', async () => {
    const mockResponse = { message: 'Password has been reset successfully' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await resetPassword(token, newPassword);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/password/reset-password/${token}`,
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      }),
    );
  });

  // Test erreur : l'API renvoie un message d'erreur explicite
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Invalid or expired token';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
        statusText: 'Unauthorized',
      } as Response),
    );

    await expect(resetPassword(token, newPassword)).rejects.toThrow(
      errorMessage,
    );
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

    await expect(resetPassword(token, newPassword)).rejects.toThrow(
      'Internal Server Error',
    );
  });

  // Test erreur : échec réseau ou erreur inconnue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(resetPassword(token, newPassword)).rejects.toThrow(
      'Network error',
    );
  });
});
