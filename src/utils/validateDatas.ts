import { User } from '@/interfaces/user.interface';

const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
const passwordRegex: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

// Fonctions pour valider les données en entrée
// ===========================================================================================
export function validateData(email: User['email'], password: string): boolean {
  return emailRegex.test(email) && passwordRegex.test(password);
}

export function validateEmail(email: User['email']): boolean {
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return passwordRegex.test(password);
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): boolean {
  return password === confirmPassword;
}
