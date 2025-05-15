'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavItem {
  name: string;
  navTo: string;
}

const loggedOutNavitems: NavItem[] = [
  { name: 'Create a free account', navTo: '/dashboard/account/signup' },
  { name: 'Sign in', navTo: '/dashboard/account/login' },
];

// const loggedInNavitems: NavItem[] = [];

export default function Navigation() {
  return (
    <nav className="flex h-full items-center justify-center gap-8">
      {loggedOutNavitems.map((item) => (
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
