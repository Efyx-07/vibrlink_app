'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import SectionTitle from '@/components/Shared/SectionTitle';
import { User } from '@/interfaces/user.interface';
import { useState } from 'react';
import { useRequestPasswordReset } from '@/hooks/useRequestPasswordReset';

export default function ResetPasswordAskForm() {
  // State pour le formulaire de connexion
  const [email, setEmail] = useState<User['email']>('');

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // State pour le message de succès
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Utilisation du hook de connexion utilisateur
  const { mutate, isPending } = useRequestPasswordReset();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    // Appelle la mutation pour la connexion
    mutate(
      { email },
      {
        onSuccess: () => {
          const message: string =
            'A reset link has been sent to your address. Please check your mailbox !';
          setSuccessMessage(message);
        },
        onError: () => {
          const message: string = 'Unknown email address';
          setErrorMessage(message);
        },
      },
    );
  };
  // ===========================================================================================

  return (
    <div className="flex w-full flex-col gap-8">
      <SectionTitle
        title="Ask for a new password"
        textColor="text-accentColor"
      />
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
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
          />
          <Button
            type="submit"
            label="Send reset link"
            isLoading={isPending}
            disabled={isPending}
          />
          {errorMessage && <ErrorMessage text={errorMessage} />}
        </form>
      )}
    </div>
  );
}
