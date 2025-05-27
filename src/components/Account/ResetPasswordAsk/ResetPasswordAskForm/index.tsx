'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import SectionTitle from '@/components/Shared/SectionTitle';
import { User } from '@/interfaces/user.interface';
import { useState } from 'react';

export default function ResetPasswordAskForm() {
  // State pour le formulaire de connexion
  const [email, setEmail] = useState<User['email']>('');

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur
  };
  // ===========================================================================================

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <SectionTitle
        title="Ask for a new password"
        textColor="text-accentColor"
      />
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
      <Button
        type="submit"
        label="Send reset link"
        //isLoading={isPending}
        //disabled={isPending}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
