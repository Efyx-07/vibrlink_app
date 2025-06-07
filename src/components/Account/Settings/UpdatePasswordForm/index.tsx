'use client';

import Button from '@/components/Shared/Button';
import ErrorMessage from '@/components/Shared/Forms/ErrorMessage';
import FormField from '@/components/Shared/Forms/FormField';
import { usePasswordVisibility } from '@/hooks/password/usePasswordVisibility';
import { useUpdatePassword } from '@/hooks/password/useUpdatePassword';
import {
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validateDatas';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import SectionTitle from '@/components/Shared/SectionTitle';
import { useLogoutUser } from '@/hooks/user/useLogoutUser';

export default function UpdatePasswordForm() {
  const router = useRouter();

  // Récupération du user dans le store
  const user = useUserStore((state) => state.user);
  const userId = user?.id as User['id'];

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
  const { mutate: updatingPasswordMutation, isPending: isUpdatingPassword } =
    useUpdatePassword();

  // Utilisation du hook pour la déconnexion
  const { logout, isPending: isLoggingOut } = useLogoutUser();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Reset du message d'erreur

    // Affiche un message d'erreur si les champs ne sont pas valides
    if (
      !validatePassword(newPassword) ||
      !validateConfirmPassword(newPassword, confirmNewPassword)
    ) {
      setErrorMessage('Invalid password format');
      return;
    }

    // Verifie si l'ID utilisateur est présent
    if (!userId) return;

    // Appelle la mutation pour la mise à jour du mot de passe
    updatingPasswordMutation(
      { userId, currentPassword, newPassword },
      {
        onSuccess: () => {
          logout({ redirect: false }); // déconnexion
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
        isLoading={isUpdatingPassword || isLoggingOut || isRedirecting}
        disabled={isUpdatingPassword || isLoggingOut || isRedirecting}
      />
      {errorMessage && <ErrorMessage text={errorMessage} />}
    </form>
  );
}
