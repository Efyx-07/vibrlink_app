import { apiUrl } from '@/config';
import {
  User,
  SignupResponse,
  LoginResponse,
  UpdatePasswordResponse,
} from '@/interfaces/user.interface';

// Service pour l'inscription d'un utilisateur, retourne les datas de l'utilisateur
// ===========================================================================================
export async function signupUser(
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }
    const data: SignupResponse = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during registration');
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

// Service pour la mise à jour du mot de passe d'un utilisateur, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function updatePassword(
  token: string | null,
  userId: User['id'],
  currentPassword: User['password'],
  newUserPassword: User['password'],
): Promise<UpdatePasswordResponse> {
  try {
    const response = await fetch(`${apiUrl}/passwordRoute/update-password`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        currentPassword,
        newUserPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: UpdatePasswordResponse = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during password update');
  }
}
