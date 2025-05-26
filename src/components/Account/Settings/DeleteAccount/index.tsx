'use client';

import ConfirmModal from '@/components/Shared/ConfirmModal';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useState } from 'react';
import useUserStore from '@/stores/userStore';
import { User } from '@/interfaces/user.interface';
import { useRouter } from 'next/navigation';
import Button from '@/components/Shared/Button';

export default function DeleteAccount() {
  const router = useRouter();
  const userStore = useUserStore();

  // State pour gérer l'ouverture et la fermeture de la modale de confirmation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Gère l'ouverture et la fermeture de la modale de confirmation
  const openConfirmModal = () => setIsOpen(true);
  const closeConfirmModal = () => setIsOpen(false);

  // Utilisation du hook et la mutation pour supprimer le compte utilisateur
  const { mutate, isPending } = useDeleteAccount();

  // Récupération du user et methode de déconnexion du store
  const { user, logoutUser } = userStore;
  const userId = user?.id as User['id'];
  if (!userId) return;

  const deleteAccount = async (): Promise<void> => {
    mutate(userId);
    closeConfirmModal();
    logoutUser(); // Deconnecte l'utilisateur après la suppression
    router.push('/'); // Redirige vers la page d'accueil après la suppression
  };
  // ===========================================================================================

  return (
    <>
      <div className="flex justify-end">
        <div className="w-56">
          <Button
            type="button"
            label="Delete my account"
            onButtonClick={openConfirmModal}
            isDangerous
            isSmall
          />
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          topline={`Are you sure you want to delete your account?`}
          message="This will definitely remove this release."
          onConfirm={deleteAccount}
          onCancel={closeConfirmModal}
          icon="mdi:skull-crossbones"
          isLoading={isPending}
        />
      )}
    </>
  );
}
