import { apiUrl } from '@/config';
import { User, SignupResponse } from '@/interfaces/user.interface';

// Service pour l'inscription d'un utilisateur, retourne les datas de l'utilisateur
// ===========================================================================================
export async function register(
  email: User['email'],
  password: User['password'],
): Promise<SignupResponse> {
  try {
    const response = await fetch(`${apiUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data: SignupResponse = await response.json();
      return data;
    } else {
      throw new Error('Error during registration:' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error during registration:' + error);
  }
}
