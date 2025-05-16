'use client';

import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

export default function MyAccountItem() {
  // Récupère l'état de connexion de l'utilisateur
  const isLogged: boolean = useUserStore((state) => state.isLoggedIn);

  // Etat de visibilité du menu utilisateur
  const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] =
    useState<boolean>(false);
  return (
    isLogged && (
      <>
        <div
          className="relative flex h-full cursor-pointer items-center hover:text-accentColor"
          onMouseEnter={() => setIsHoverUserMenuVisible(true)}
          onMouseLeave={() => setIsHoverUserMenuVisible(false)}
        >
          <p>My account</p>
          {isHoverUserMenuVisible && <HoverUserMenu />}
        </div>
      </>
    )
  );
}

// Composant local pour le menu utilisateur
// ===========================================================================================
function HoverUserMenu() {
  const router = useRouter();

  // Récupère l'utilisateur connecté
  const user = useUserStore((state) => state.user);

  return (
    <div className="absolute -right-6 top-[4.9rem] w-60 border-4 border-accentColor bg-whiteColor text-darkColor">
      <div className="">
        <div className="flex items-center justify-center border-b border-whiteLight25 bg-darkColor p-4 text-xs text-whiteColor">
          {user && <p>{user.email}</p>}
        </div>
        <UserItem
          name="Account settings"
          onClick={() => router.push('/vl/account/settings')}
        />
        <UserItem name="Sign out" onClick={() => {}} />
      </div>
    </div>
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
