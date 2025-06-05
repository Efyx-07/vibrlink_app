'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useUserStore from '@/stores/userStore';

const guestOnlyRoutes = [
  '/vl/home',
  '/vl/account/login',
  '/vl/account/signup',
  '/vl/account/reset-password',
];

const authOnlyRoutes = ['/vl/links', '/vl/account/settings'];

export default function AuthRedirector() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    const isGuestOnly = guestOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );
    const isAuthOnly = authOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isLoggedIn && isGuestOnly) {
      // Si connecté sur une page réservée aux guests → redirige vers my-links
      router.replace('/vl/links/my-links');
    } else if (!isLoggedIn && isAuthOnly) {
      // Si non connecté sur une page nécessitant auth → redirige vers login
      router.replace('/vl/account/login');
    }
  }, [isLoggedIn, pathname, router]);

  return null;
}
