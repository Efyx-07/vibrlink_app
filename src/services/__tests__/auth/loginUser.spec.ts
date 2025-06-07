import { loginUser } from '@/services/auth.service';
import { apiUrl } from '@/constant';

// Test de la fonction loginUser
// ===========================================================================================
describe('loginUser', () => {
  const email = 'test@example.com';
  const password = 'Password123!';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test succès: retourne les données (message, user, token) après connexion réussie
  it('should return data on successful login', async () => {
    const mockResponse = {
      message: 'Login successful',
      user: { id: 1, email },
      token: 'fake-jwt-token',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const data = await loginUser(email, password);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/user/login`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      }),
    );
  });

  // Test erreur: l'API renvoie un message d'erreur explicite (ex: mauvais identifiants)
  it('should throw error with message from API when response is not ok', async () => {
    const errorMessage = 'Invalid credentials';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
        statusText: 'Unauthorized',
      } as Response),
    );

    await expect(loginUser(email, password)).rejects.toThrow(errorMessage);
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

    await expect(loginUser(email, password)).rejects.toThrow(
      'Internal Server Error',
    );
  });

  // Test erreur: échec réseau ou autre erreur non prévue
  it('should throw generic error on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    await expect(loginUser(email, password)).rejects.toThrow('Network error');
  });
});
