import { deleteUserAccount } from '@/services/auth.service';
import { apiUrl } from '@/constant';

// Test de la fonction deleteUserAccount
// ===========================================================================================
describe('deleteUserAccount', () => {
  const userId = 123;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès : retourne un message de succès après suppression du compte utilisateur
  it('should return success message on successful account deletion', async () => {
    const mockResponse = { message: 'Account deleted successfully' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await deleteUserAccount(userId);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/user/${userId}`,
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
  });

  // Test erreur : l'API renvoie un message d'erreur explicite
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'User not found';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
        statusText: 'Not Found',
      } as Response),
    );

    await expect(deleteUserAccount(userId)).rejects.toThrow(errorMessage);
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

    await expect(deleteUserAccount(userId)).rejects.toThrow(
      'Internal Server Error',
    );
  });

  // Test erreur : échec réseau ou erreur inconnue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(deleteUserAccount(userId)).rejects.toThrow('Network error');
  });
});
