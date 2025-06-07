import { signupUser } from '@/services/auth.service';
import { apiUrl } from '@/constant';

// Test de la fonction signupUser
// ===========================================================================================
describe('signupUser', () => {
  const email = 'test@example.com';
  const password = 'Password123!';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès: retourne les données utilisateur après inscription réussie
  it('should return data on successful signup', async () => {
    const mockResponse = { userId: 1, email };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await signupUser(email, password);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/user/register`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }),
    );
  });

  // Test erreur: l'API renvoie un message d'erreur explicite (ex: email déjà existant)
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Email already exists';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
        statusText: 'Conflict',
      } as Response),
    );

    await expect(signupUser(email, password)).rejects.toThrow(errorMessage);
  });

  // Test erreur: l'API ne renvoie pas de message dans le JSON, on utilise statusText
  it('should throw error with statusText if API does not send message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject('fail'),
        statusText: 'Internal Server Error',
      } as Response),
    );

    await expect(signupUser(email, password)).rejects.toThrow(
      'Internal Server Error',
    );
  });

  // Test erreur: échec réseau ou autre erreur non prévue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(signupUser(email, password)).rejects.toThrow('Network error');
  });
});
