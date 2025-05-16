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

export default function Navigation() {
  // Récupère l'état de connexion de l'utilisateur
  const isLogged: boolean = useUserStore((state) => state.isLoggedIn);
  return (
    <nav className="flex h-full items-center justify-center gap-8">
      {isLogged
        ? loggedInNavItems.map((item) => (
            <NavItem key={item.name} name={item.name} navTo={item.navTo} />
          ))
        : loggedOutNavitems.map((item) => (
            <NavItem key={item.name} name={item.name} navTo={item.navTo} />
          ))}
    </nav>
  );
}

// Composant local pour un item de navigation
// ===========================================================================================
interface NavItemProps {
  name: string;
  navTo: string;
}

function NavItem({ name, navTo }: NavItemProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(pathname === navTo);

  useEffect(() => {
    setIsActive(pathname === navTo);
  }, [pathname, navTo]);

  return (
    <Link
      href={navTo}
      className={`hover:text-accentColor ${isActive ? 'text-accentColor' : ''}`}
    >
      <p>{name}</p>
    </Link>
  );
}
