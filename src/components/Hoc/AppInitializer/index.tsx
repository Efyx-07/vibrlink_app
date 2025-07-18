'use client';

import { useCallback, useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import LoadingPage from '@/components/Layout/LoadingPage';
import { useLogoutUser } from '@/hooks/user/useLogoutUser';
import { validateUserSession } from '@/services/user.service';
import AuthRedirector from '../AuthRedirector';

interface Props {
  children: React.ReactNode;
}

// Initialise l'app au démarrage
// ===========================================================================================
export default function AppInitializer({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const { initialized, loadUserDataFromLocalStorage } = useUserStore();
  const { logout } = useLogoutUser();

  // Fonction principale d'initialisation. Mémorisée avec useCallback pour mémoriser la fonction entre les rendus.
  const init = useCallback(async (): Promise<void> => {
    try {
      // Charge les données utilisateurs avec la méthode du store
      await loadUserDataFromLocalStorage();

      // Récupère l'état de connexion après le chargement des données
      const { isLoggedIn } = useUserStore.getState();

      // Si non connecté, ne fait rien
      if (!isLoggedIn) return;

      // Si oui, vérifie la session (validité du token)
      await validateUserSession();
    } catch {
      // Redirige si un token était présent mais invalide
      logout({ redirect: true });
    } finally {
      setLoading(false);
    }
  }, [loadUserDataFromLocalStorage, logout]);

  useEffect(() => {
    if (!initialized) init();
    else setLoading(false);

    // Revalidation toutes les heures si utilisateur connecté
    const intervalId: NodeJS.Timeout = setInterval(async () => {
      const { isLoggedIn } = useUserStore.getState();

      if (!isLoggedIn) return;

      try {
        await validateUserSession();
      } catch {
        logout({ redirect: true });
      }
    }, 3600000); // 1h

    return () => clearInterval(intervalId);
  }, [initialized, init, logout]);

  if (loading) return <LoadingPage />;

  return (
    <>
      <AuthRedirector />
      {children}
    </>
  );
}
