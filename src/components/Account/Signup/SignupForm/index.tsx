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
import { useSignupUser } from '@/hooks/useSignupUser';
import { User } from '@/interfaces/user.interface';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import SectionTitle from '@/components/Shared/SectionTitle';
import { useLoginUser } from '@/hooks/useLoginUser';
import useUserStore from '@/stores/userStore';

// Composant pour l'inscription d'un utilisateur
// ===========================================================================================
export default function SignupForm() {
  const router = useRouter();
  const { setUserData } = useUserStore();

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
  const { mutate: signupMutate, isPending: isSigningUp } = useSignupUser();

  // Utilisation du hook de connexion de l'utilisateur
  const { mutate: loginMutate, isPending: isLoging } = useLoginUser();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    if (
      !validateData(email, password) ||
      !validateConfirmPassword(password, confirmPassword)
    ) {
      console.error('Invalid email or password format');
      return;
    }

    // Appelle la mutation pour l'inscription
    signupMutate(
      { email, password },
      {
        onSuccess: () => {
          // Auto-login après inscription
          loginMutate(
            { email, password },
            {
              onSuccess: (data) => {
                setUserData(data.user);
                setIsRedirecting(true);
                router.push('/vl/links/my-links');
              },
              onError: () =>
                setErrorMessage('Signup succeeded, but login failed.'),
            },
          );
        },
        onError: () =>
          setErrorMessage('An error occurred during registration.'),
      },
    );
  };
  // ===========================================================================================

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <SectionTitle title="Create account" textColor="text-accentColor" />
      <FormField
        id="email"
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isValid={isEmailValid}
      />
      <FormField
        id="password"
        label="Create a password"
        addedMention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        name="password"
        type={isPasswordVisible('password') ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
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
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isValid={isConfirmPasswordValid}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('confirmPassword')}
        isPasswordVisible={isPasswordVisible('confirmPassword')}
      />
      <Button
        type="submit"
        label="Signup and login"
        isLoading={isSigningUp || isLoging || isRedirecting}
        disabled={isSigningUp || isLoging || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
