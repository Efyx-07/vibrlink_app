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

export default function AuthRedirector() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    const isGuestOnly = guestOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isLoggedIn && isGuestOnly) {
      router.replace('/vl/links/my-links');
    }
  }, [isLoggedIn, pathname, router]);

  return null;
}
