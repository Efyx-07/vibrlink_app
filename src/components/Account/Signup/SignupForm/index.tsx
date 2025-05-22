'use client';

import FormField from '@/components/Shared/Forms/FormField';
import Button from '@/components/Shared/Button';
import {
  validateData,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validateDatas';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterUser } from '@/hooks/useRegisterUser';

// Composant pour l'inscription d'un utilisateur
// ===========================================================================================
export default function SignupForm() {
  const router = useRouter();

  // State pour les champs du formulaire
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const [isConfirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(false);

  // Vérification de la validité des champs
  useEffect(() => {
    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));
    setConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
  }, [email, password, confirmPassword]);

  // Utilisation du hook d'inscription utilisateur
  const { mutate, isPending } = useRegisterUser();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (
      !validateData(email, password) ||
      !validateConfirmPassword(password, confirmPassword)
    ) {
      console.error('Invalid email or password format');
      return;
    }

    // Appelle la mutation pour l'inscription
    mutate(
      { email, password },
      {
        onSuccess: () => router.push('/vl/account/login'),
        onError: (error) => console.error('Failed during registration:', error),
      },
    );
  };
  // ===========================================================================================

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isValid={isEmailValid}
      />
      <FormField
        id="password"
        label="Create a password"
        addedMention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isValid={isPasswordValid}
      />
      <FormField
        id="password-confirm"
        label="Confirm your password"
        addedMention="must be identical to your password"
        name="password-confirm"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        isValid={isConfirmPasswordValid}
      />
      <Button type="submit" label="Sign up" isLoading={isPending} />
    </form>
  );
}
