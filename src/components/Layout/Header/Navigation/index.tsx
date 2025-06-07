'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';

interface NavItem {
  name: string;
  navTo: string;
}

// Items de navigation pour les utilisateurs non connectés
const loggedOutNavitems: NavItem[] = [
  { name: 'Create a free account', navTo: '/vl/account/signup' },
  { name: 'Sign in', navTo: '/vl/account/login' },
];

// Items de navigation pour les utilisateurs connectés
const loggedInNavItems: NavItemProps[] = [
  { name: 'Create a new link', navTo: '/vl/links/new-link' },
  { name: 'My links', navTo: '/vl/links/my-links' },
];
// ===========================================================================================
interface NavigationProps {
  onCloseMenu?: () => void;
}

export default function Navigation({ onCloseMenu }: NavigationProps) {
  // Récupère l'état de connexion de l'utilisateur
  const isLogged: boolean = useUserStore((state) => state.isLoggedIn);
  return (
    <nav className="flex h-full flex-col justify-center gap-6 text-lg md:flex-row md:items-center md:gap-12 md:text-base">
      {(isLogged ? loggedInNavItems : loggedOutNavitems).map((item) => (
        <NavItem
          key={item.name}
          name={item.name}
          navTo={item.navTo}
          onCloseMenu={onCloseMenu}
        />
      ))}
    </nav>
  );
}

// Composant local pour un item de navigation
// ===========================================================================================
interface NavItemProps {
  name: string;
  navTo: string;
  onCloseMenu?: () => void;
}

function NavItem({ name, navTo, onCloseMenu }: NavItemProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<boolean>(pathname === navTo);

  useEffect(() => {
    setIsActive(pathname === navTo);
  }, [pathname, navTo]);

  return (
    <Link
      href={navTo}
      className={`hover:text-accentColor ${isActive ? 'text-accentColor' : ''}`}
      onClick={onCloseMenu}
    >
      <p>{name}</p>
    </Link>
  );
}
