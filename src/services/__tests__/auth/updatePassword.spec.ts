import { updatePassword } from '@/services/auth.service';
import { apiUrl } from '@/constant';

// Test de la fonction updatePassword
// ===========================================================================================
describe('updatePassword', () => {
  const userId = 123;
  const currentPassword = 'oldPass123!';
  const newUserPassword = 'newPass456!';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : retourne un message de succès après mise à jour du mot de passe
  it('should return success message on successful password update', async () => {
    const mockResponse = { message: 'Password updated successfully' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await updatePassword(userId, currentPassword, newUserPassword);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/password/update-password`,
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId,
          currentPassword,
          newUserPassword,
        }),
      }),
    );
  });

  // Test erreur : l'API renvoie un message d'erreur explicite
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Current password incorrect';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
        statusText: 'Unauthorized',
      } as Response),
    );

    await expect(
      updatePassword(userId, currentPassword, newUserPassword),
    ).rejects.toThrow(errorMessage);
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

    await expect(
      updatePassword(userId, currentPassword, newUserPassword),
    ).rejects.toThrow('Internal Server Error');
  });

  // Test erreur : échec réseau ou erreur inconnue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(
      updatePassword(userId, currentPassword, newUserPassword),
    ).rejects.toThrow('Network error');
  });
});
