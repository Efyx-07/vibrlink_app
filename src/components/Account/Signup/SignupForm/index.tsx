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
import { User } from '@/interfaces/user.interface';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';

// Composant pour l'inscription d'un utilisateur
// ===========================================================================================
export default function SignupForm() {
  const router = useRouter();

  // State pour les champs du formulaire
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const [isConfirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(false);

  // State pour l'opération de redirection
  // Permet au bouton de rester en mode loading jusqu'à la fin du processus Succès
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Utilise le hook pour gérer la visibilité des passwords
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

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
        onSuccess: () => {
          setIsRedirecting(true);
          router.push('/vl/account/login');
        },
        onError: () => {
          const message: string = 'An error occured during registration';
          setErrorMessage(message);
        },
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
        type={isPasswordVisible('password') ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isValid={isPasswordValid}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('password')}
        isPasswordVisible={isPasswordVisible('password')}
      />
      <FormField
        id="password-confirm"
        label="Confirm your password"
        addedMention="must be identical to your password"
        name="password-confirm"
        type={isPasswordVisible('confirmPassword') ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        isValid={isConfirmPasswordValid}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('confirmPassword')}
        isPasswordVisible={isPasswordVisible('confirmPassword')}
      />
      <Button
        type="submit"
        label="Sign up"
        isLoading={isPending || isRedirecting}
        disabled={isPending || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
