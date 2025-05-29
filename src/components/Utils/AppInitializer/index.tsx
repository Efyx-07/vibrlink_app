'use client';

import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import LoadingPage from '@/components/LoadingPage';
import { useLogoutUser } from '@/hooks/useLogoutUser';
import { validateUserSession } from '@/services/auth.service';

interface Props {
  children: React.ReactNode;
}

export default function AppInitializer({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const { initialized, loadUserDataFromLocalStorage } = useUserStore();
  const { logout } = useLogoutUser();

  // Initialisation complète : charge données puis vérifie la session utilisateur
  const init = async () => {
    try {
      await loadUserDataFromLocalStorage();
      await validateUserSession();
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized) init();
    else setLoading(false);

    // Vérifie la validité de la session utilisateur toutes les heures
    const intervalId: NodeJS.Timeout = setInterval(async () => {
      try {
        await validateUserSession();
      } catch (error) {
        logout();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, [initialized, loadUserDataFromLocalStorage, logout]);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}
