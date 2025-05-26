'use client';

import ConfirmModal from '@/components/Shared/ConfirmModal';
import { useState } from 'react';

export default function DeleteAccount() {
  // State pour gérer l'ouverture et la fermeture de la modale de confirmation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Gère l'ouverture et la fermeture de la modale de confirmation
  const openConfirmModal = () => setIsOpen(true);
  const closeConfirmModal = () => setIsOpen(false);
  // ===========================================================================================

  return (
    <>
      <div className="flex justify-end">
        <p
          className="cursor-pointer hover:text-accentColor"
          onClick={openConfirmModal}
        >
          Delete my account
        </p>
      </div>
      {isOpen && (
        <ConfirmModal
          topline={`Are you sure you want to delete your account? ?`}
          message="This will definitely remove this release."
          onConfirm={() => {}}
          onCancel={closeConfirmModal}
          icon="mdi:skull-crossbones"
          //isLoading={isPending}
        />
      )}
    </>
  );
}
