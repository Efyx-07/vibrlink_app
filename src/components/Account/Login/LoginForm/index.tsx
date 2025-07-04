'use client';

import Button from '@/components/Shared/Button';
import FormField from '@/components/Shared/Forms/FormField';
import { useState } from 'react';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import { User } from '@/interfaces/user.interface';
import { usePasswordVisibility } from '@/hooks/password/usePasswordVisibility';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import SectionTitle from '@/components/Shared/SectionTitle';

export default function LoginForm() {
  // State pour le formulaire de connexion
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<string>('');

  // State pour l'opération de redirection
  // Permet au bouton de rester en mode loading jusqu'à la fin du processus Succès
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Utilise le hook pour gérer la visibilité du password
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

  // Utilisation du hook de connexion utilisateur
  const { mutate, isPending } = useLoginUser({
    setIsRedirecting,
    onError: () => setErrorMessage('Invalid email or password'),
  });

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    // Appelle la mutation pour la connexion
    mutate({ email, password });
  };
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <SectionTitle title="Login" textColor="text-accentColor" />
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
      />
      <Button
        type="submit"
        label="Log in"
        isLoading={isPending || isRedirecting}
        disabled={isPending || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
