'use client';

import Button from '@/components/Shared/Button';
import FormField from '@/components/Shared/Forms/FormField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';
import { useLoginUser } from '@/hooks/useLoginUser';
import { User } from '@/interfaces/user.interface';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';

export default function LoginForm() {
  const router = useRouter();
  const { setUserData, setToken } = useUserStore();

  // State pour le formulaire de connexion
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<string>('');

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Utilise le hook pour gérer la visibilité du password
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

  // Vérifie que les champs sont remplis, non constitués d'espaces
  const isButtonDisabled: boolean =
    email.trim() === '' || password.trim() === '';

  // Utilisation du hook de connexion utilisateur
  const { mutate, isPending } = useLoginUser();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    // Appelle la mutation pour la connexion
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setUserData(data.user);
          localStorage.setItem('token', data.token);
          setToken(data.token);
          router.push('/vl/links/my-links');
        },
        onError: () => {
          const message = 'Invalid email or password';
          setErrorMessage(message);
        },
      },
    );
  };
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
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
        required
      />
      <FormField
        id="password"
        label="Enter your password"
        name="password"
        type={isPasswordVisible('password') ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('password')}
        isPasswordVisible={isPasswordVisible('password')}
        required
      />
      <Button
        type="submit"
        label="Log in"
        isLoading={isPending}
        disabled={isButtonDisabled}
      />
      {errorMessage && (
        <p className="-mb-2 -mt-4 text-sm text-errorColor">{errorMessage}</p>
      )}
    </form>
  );
}
