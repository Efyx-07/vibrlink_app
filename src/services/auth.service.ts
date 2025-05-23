import { apiUrl } from '@/config';
import {
  User,
  SignupResponse,
  LoginResponse,
} from '@/interfaces/user.interface';

// Service pour l'inscription d'un utilisateur, retourne les datas de l'utilisateur
// ===========================================================================================
export async function registerUser(
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

// Service pour la connexion d'un utilisateur, retourne un objet (message de succès, user et token)
// ===========================================================================================
export async function loginUser(
  email: User['email'],
  password: User['password'],
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during login');
  }
}
