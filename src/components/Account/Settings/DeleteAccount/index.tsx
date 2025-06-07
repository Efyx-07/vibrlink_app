'use client';

import ConfirmModal from '@/components/Shared/ConfirmModal';
import { useDeleteAccount } from '@/hooks/user/useDeleteAccount';
import { useState } from 'react';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import Button from '@/components/Shared/Button';
import SectionTitle from '@/components/Shared/SectionTitle';
import { useLogoutUser } from '@/hooks/user/useLogoutUser';

export default function DeleteAccount() {
  // Récupération du user dans le store
  const user = useUserStore((state) => state.user);
  const userId = user?.id as User['id'];

  // State pour gérer l'ouverture et la fermeture de la modale de confirmation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Gère l'ouverture et la fermeture de la modale de confirmation
  const openConfirmModal = () => setIsOpen(true);
  const closeConfirmModal = () => setIsOpen(false);

  // Utilisation du hook et la mutation pour supprimer le compte utilisateur
  const { mutate: deleteAccountMutation, isPending: isDeleting } =
    useDeleteAccount();

  // Utilisation du hook pour la déconnexion et la redirection
  const { logout, isPending: isLoggingOut } = useLogoutUser();

  // Verifie si l'ID utilisateur est présent
  if (!userId) return;

  // Fonction pour la suppression du compte utilisateur et ses données
  const deleteAccount = (): void => {
    deleteAccountMutation(userId, {
      onSuccess: () => {
        logout(); // déconnexion + redirection
        closeConfirmModal();
      },
      onError: (error) => {
        console.error('Account deletion failed', error);
        closeConfirmModal();
      },
    });
  };
  // ===========================================================================================

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle title="Delete account" textColor="text-errorColor" />
      <p className="text-sm">
        This operation is not reversible. It will remove your account and all
        your associated datas. Please be certain.
      </p>
      <div className="flex justify-end">
        <Button
          type="button"
          label="Delete my account"
          onButtonClick={openConfirmModal}
          isDangerous
          isSmall
        />
      </div>
      {isOpen && (
        <ConfirmModal
          topline={`Are you sure you want to delete your account?`}
          message="This will definitely remove your account and all your datas."
          onConfirm={deleteAccount}
          onCancel={closeConfirmModal}
          icon="mdi:skull-crossbones"
          isLoading={isDeleting || isLoggingOut}
        />
      )}
    </div>
  );
}
