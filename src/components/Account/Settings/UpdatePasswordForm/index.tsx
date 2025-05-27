'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import { useUpdatePassword } from '@/hooks/useUpdatePassword';
import {
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validateDatas';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import SectionTitle from '@/components/Shared/SectionTitle';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const userStore = useUserStore();

  // State pour les champs du formulaire
  const [currentPassword, setCurrentPassword] = useState<string>('');
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

  // Vérification de la validité des champs
  useEffect(() => {
    setNewPasswordValid(validatePassword(newPassword));
    setConfirmNewPasswordValid(
      validateConfirmPassword(newPassword, confirmNewPassword),
    );
  }, [newPassword, confirmNewPassword]);

  // Utilisation du hook de mise à jour du mot de passe utilisateur
  const { mutate, isPending } = useUpdatePassword();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    if (
      !validatePassword(newPassword) ||
      !validateConfirmPassword(newPassword, confirmNewPassword)
    ) {
      console.error('Invalid password format');
      return;
    }

    // Récupère le token et l'ID de l'utilisateur depuis le store
    const { token, user } = userStore;
    const userId = user?.id as User['id'];
    if (!token || !userId) return;

    // Appelle la mutation pour la mise à jour du mot de passe
    mutate(
      { token, userId, currentPassword, newPassword },
      {
        onSuccess: () => {
          setIsRedirecting(true);
          router.push('/vl/account/login');
        },
        onError: () => {
          const message: string = 'An error occured during password update';
          setErrorMessage(message);
        },
      },
    );
  };
  // ===========================================================================================
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <SectionTitle title="Update password" textColor="text-accentColor" />
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
        isLoading={isPending || isRedirecting}
        disabled={isPending || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
