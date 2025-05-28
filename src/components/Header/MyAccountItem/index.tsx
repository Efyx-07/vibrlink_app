'use client';

import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import ConfirmModal from '@/components/Shared/ConfirmModal';
import { User } from '@/interfaces/user.interface';
import { useLogoutUser } from '@/hooks/useLogoutUser';

export default function MyAccountItem() {
  const router = useRouter();

  // Récupère l'état de connexion de l'utilisateur
  const isLogged: boolean = useUserStore((state) => state.isLoggedIn);

  // Récupère l'utilisateur connecté
  const user = useUserStore((state) => state.user);
  const { logoutUserLocal } = useUserStore();

  // Etat de visibilité du menu utilisateur
  const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] =
    useState<boolean>(false);

  // State pour gérer l'ouverture et la fermeture de la modale de confirmation
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  // Gère l'ouverture et la fermeture de la modale de confirmation
  const openConfirmModal = (): void => {
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = (): void => setIsConfirmModalOpen(false);

  // Utilisation du hook de déconnexion utilisateur
  const { mutate, isPending } = useLogoutUser();

  // Fonction de déconnexion
  const handleLogout = (): void => {
    // Appelle la mutation pour la déconnexion
    mutate(undefined, {
      onSuccess: (): void => {
        logoutUserLocal();
        router.push('/vl/home');
        closeConfirmModal();
      },
      onError: (error: unknown): void => {
        console.error('Logout failed', error);
        closeConfirmModal();
      },
    });
  };
  // ===========================================================================================

  return (
    isLogged && (
      <>
        <div
          className="relative flex h-full cursor-pointer items-center hover:text-accentColor md:pr-8"
          onMouseEnter={() => setIsHoverUserMenuVisible(true)}
          onMouseLeave={() => setIsHoverUserMenuVisible(false)}
        >
          <p>My account</p>
          {isHoverUserMenuVisible && (
            <HoverUserMenu
              user={user}
              onAccountSettingsClick={() => router.push('/vl/account/settings')}
              onSignOutClick={openConfirmModal}
            />
          )}
        </div>
        {isConfirmModalOpen && (
          <ConfirmModal
            topline="Are you sure?"
            message="Please confirm to sign out."
            onConfirm={handleLogout}
            onCancel={closeConfirmModal}
            icon="material-symbols:question-mark"
            isLoading={isPending}
          />
        )}
      </>
    )
  );
}

// Composant local pour le menu utilisateur
// ===========================================================================================
interface HoverUserMenuProps {
  user: User | null;
  onAccountSettingsClick: () => void;
  onSignOutClick: () => void;
}

function HoverUserMenu({
  user,
  onAccountSettingsClick,
  onSignOutClick,
}: HoverUserMenuProps) {
  return (
    <>
      <div className="absolute -right-16 top-[4.9rem] w-60 border-4 border-accentColor bg-whiteColor text-darkColor md:right-0">
        <div className="">
          <div className="flex items-center justify-center border-b border-whiteLight25 bg-darkColor p-4 text-xs text-whiteColor">
            {user && <p>{user.email}</p>}
          </div>
          <UserItem name="Account settings" onClick={onAccountSettingsClick} />
          <UserItem name="Sign out" onClick={onSignOutClick} />
        </div>
      </div>
    </>
  );
}

// Composant local pour un item du menu utilisateur
// ===========================================================================================
interface UserItemProps {
  name: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function UserItem({ name, onClick }: UserItemProps) {
  return (
    <div
      className="p-4 hover:bg-darkColor hover:text-whiteColor"
      onClick={onClick}
    >
      <p className="text-sm">{name}</p>
    </div>
  );
}
