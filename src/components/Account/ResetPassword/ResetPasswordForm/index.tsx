'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import SectionTitle from '@/components/Shared/SectionTitle';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import { FormEvent, useState } from 'react';

export default function ResetPasswordForm() {
  // State pour les champs du formulaire
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isNewPasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [isConfirmNewPasswordValid, setConfirmNewPasswordValid] =
    useState<boolean>(false);

  // State pour l'opération de redirection
  // Permet au bouton de rester en mode loading jusqu'à la fin du processus Succès
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Utilise le hook pour gérer la visibilité des passwords
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage('');
  };
  // ===========================================================================================

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <SectionTitle title="Update password" textColor="text-accentColor" />
      <FormField
        id="new-password"
        label="Create a new password"
        addedMention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        name="new-password"
        type={isPasswordVisible('newPassword') ? 'text' : 'password'}
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isValid={isNewPasswordValid}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('newPassword')}
        isPasswordVisible={isPasswordVisible('newPassword')}
      />
      <FormField
        id="new-password-confirm"
        label="Confirm your password"
        addedMention="must be identical to your password"
        name="new-password-confirm"
        type={isPasswordVisible('confirmNewPassword') ? 'text' : 'password'}
        value={confirmNewPassword}
        onChange={(e) => {
          setConfirmNewPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isValid={isConfirmNewPasswordValid}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('confirmNewPassword')}
        isPasswordVisible={isPasswordVisible('confirmNewPassword')}
      />
      <Button
        type="submit"
        label="Update my password"
        //isLoading={isPending || isRedirecting}
        //disabled={isPending || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
