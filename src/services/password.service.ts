import { apiUrl } from '@/constant';
import { User, UpdatePasswordResponse } from '@/interfaces/user.interface';

// Service pour la mise à jour du mot de passe d'un utilisateur, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function updatePassword(
  userId: User['id'],
  currentPassword: User['password'],
  newUserPassword: User['password'],
): Promise<UpdatePasswordResponse> {
  try {
    const response = await fetch(`${apiUrl}/password/update-password`, {
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
      const message: string =
        errorData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: UpdatePasswordResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during password update');
  }
}

// Service pour demander la réinitialisation du mot de passe, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function requestPasswordReset(
  email: User['email'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${apiUrl}/password/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.error || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: { message: string } = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during email sending');
  }
}

// Service pour réinitialiser du mot de passe, retourne un message de succès ou d'erreur
// ===========================================================================================
export async function resetPassword(
  token: string | null,
  newPassword: User['password'],
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${apiUrl}/password/reset-password/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message: string =
        errorData?.error || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    const data: { message: string } = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error during password reset');
  }
}
