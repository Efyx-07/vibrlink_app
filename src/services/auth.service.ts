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

// Service pour la connexion d'un utilisateur
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

    if (response.ok) {
      const data: LoginResponse = await response.json();
      return data;
    } else {
      throw new Error('Error while connecting: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error while connecting: ' + error);
  }
}
