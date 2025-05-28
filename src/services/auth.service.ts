import { apiUrl } from '@/config';
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
      credentials: 'include', // Important pour que le cookie soit envoyé (token)
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

// Service pour la déconnexion d'un utilisateur, retourne un message de succès
// ===========================================================================================
export async function logoutUserApi(): Promise<{ message: string }> {
  const response = await fetch(`${apiUrl}/user/logout`, {
    method: 'POST',
    credentials: 'include', // Important pour que le cookie soit envoyé (token)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message || response.statusText || 'Unknown error';
    throw new Error(message);
  }

  const data: { message: string } = await response.json();
  return data;
}

// Service pour la mise à jour du mot de passe d'un utilisateur, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function updatePassword(
  userId: User['id'],
  currentPassword: User['password'],
  newUserPassword: User['password'],
): Promise<UpdatePasswordResponse> {
  try {
    const response = await fetch(`${apiUrl}/passwordRoute/update-password`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include', // Important pour que le cookie soit envoyé (token)
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

// Service pour la suppresion du compte utilisateur, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function deleteUserAccount(
  userId: User['id'],
): Promise<DeleteUserAccountResponse> {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: DeleteUserAccountResponse = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during account deletion');
  }
}

// Service pour demander la réinitialisation du mot de passe, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function requestPasswordReset(
  email: User['email'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${apiUrl}/passwordRoute/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.error || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: { message: string } = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during email sending');
  }
}

// Service pour réinitialiser du mot de passe, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function resetPassword(
  token: string | null,
  newPassword: User['password'],
): Promise<{ message: string }> {
  try {
    console.log('Resetting password with token:', token);
    console.log('New password:', newPassword);
    const response = await fetch(
      `${apiUrl}/passwordRoute/reset-password/${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.error || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: { message: string } = await response.json();
    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error during password reset');
  }
}
