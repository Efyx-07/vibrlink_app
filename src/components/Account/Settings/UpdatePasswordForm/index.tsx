'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import { FormEvent, useState } from 'react';

export default function UpdatePasswordForm() {
  // State pour les champs du formulaire
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isNewPasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [isConfirmNewPasswordValid, setConfirmNewPasswordValid] =
    useState<boolean>(false);

  // State pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Utilise le hook pour gérer la visibilité des passwords
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };
  // ===========================================================================================
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <FormField
        id="current-password"
        label="Type your current password"
        name="current-password"
        type={isPasswordVisible('currentPassword') ? 'text' : 'password'}
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          if (errorMessage) setErrorMessage('');
        }}
        isPasswordField={true}
        onEyeClick={() => togglePasswordVisibility('currentPassword')}
        isPasswordVisible={isPasswordVisible('currentPassword')}
      />
      <FormField
        id="new-password"
        label="Create a new password"
        addedMention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        name="new-password"
        type={isPasswordVisible('newPassword') ? 'text' : 'password'}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
