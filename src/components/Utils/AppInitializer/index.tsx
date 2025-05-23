'use client';

import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import isTokenExpired from '@/utils/checkTokenExpiry';
import LoadingPage from '@/components/LoadingPage';

interface Props {
  children: React.ReactNode;
}

// Composant pour initialiser l'app avec les données de l'utilisateur
// ===========================================================================================
export default function AppInitializer({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  // Récupère les méthodes du store
  const { setToken, logOutUser, loadUserDataFromLocalStorage } = useUserStore();

  useEffect(() => {
    const appInit = async () => {
      try {
        // Charge les données de l'utilisateur depuis le localStorage
        await loadUserDataFromLocalStorage();

        // Vérifie si le token est présent dans le localStorage et met à jour le store
        const token: string | null = localStorage.getItem('token');
        if (token) setToken(token);

        // Vérifie si le token est expiré et déconnecte l'utilisateur si c'est le cas
        if (token && isTokenExpired(token)) logOutUser();

        // Met en place un intervalle pour vérifier l'expiration du token toutes les heures
        const interval: NodeJS.Timeout = setInterval(() => {
          const storedToken = localStorage.getItem('token');
          if (storedToken && isTokenExpired(storedToken)) logOutUser();
        }, 3600000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    appInit();
  }, [setToken, logOutUser, loadUserDataFromLocalStorage]);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}
