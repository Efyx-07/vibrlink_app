import { apiUrl } from '@/constant';
import {
  User,
  SignupResponse,
  LoginResponse,
  UpdatePasswordResponse,
  DeleteUserAccountResponse,
} from '@/interfaces/user.interface';

// Service pour l'inscription d'un utilisateur, retourne les datas de l'utilisateur
// ===========================================================================================
export async function signupUser(
  email: User['email'],
  password: User['password'],
): Promise<SignupResponse> {
  try {
    const response = await fetch(`${apiUrl}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }
    const data: SignupResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during registration');
  }
}

// Service pour la connexion d'un utilisateur, retourne un objet (message de succès, user et token)
// ===========================================================================================
export async function loginUser(
  email: User['email'],
  password: User['password'],
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include', // Important pour que le cookie soit envoyé (token)
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during login');
  }
}

// Service pour la déconnexion d'un utilisateur, retourne un message de succès
// ===========================================================================================
export async function logoutUserApi(): Promise<{ message: string }> {
  const response = await fetch(`${apiUrl}/users/logout`, {
    method: 'POST',
    credentials: 'include', // Important pour que le cookie soit envoyé (token)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message: string =
      errorData?.message || response.statusText || 'Unknown error';
    throw new Error(message);
  }

  const data: { message: string } = await response.json();
  return data;
}

// Service pour la suppresion du compte utilisateur, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function deleteUserAccount(
  userId: User['id'],
): Promise<DeleteUserAccountResponse> {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: DeleteUserAccountResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during account deletion');
  }
}

// Service pour vérifier la session utilisateur
// ===========================================================================================
export async function validateUserSession(): Promise<void> {
  const response = await fetch(`${apiUrl}/users/me`, {
    method: 'GET',
    credentials: 'include', // Important pour que le cookie soit envoyé (token)
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Token invalide ou absent');
}
