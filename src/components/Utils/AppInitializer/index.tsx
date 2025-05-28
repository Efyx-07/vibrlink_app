'use client';

/*import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import isTokenExpired from '@/utils/checkTokenExpiry';
import LoadingPage from '@/components/LoadingPage';
import { useLogoutUser } from '@/hooks/useLogoutUser';

interface Props {
  children: React.ReactNode;
}

// Composant pour initialiser l'app avec les données de l'utilisateur
// ===========================================================================================
export default function AppInitializer({ children }: Props) {
  // State pour le chargement
  const [loading, setLoading] = useState(true);

  // Récupère les méthodes du store
  const { initialized, token, loadUserDataFromLocalStorage } = useUserStore();

  // Utilise le hook de déconnexion centralisé
  const { logout } = useLogoutUser();

  useEffect(() => {
    const init = async () => {
      try {
        // Charge les données de l'utilisateur depuis le localStorage
        await loadUserDataFromLocalStorage();

        // Si token présent mais expiré => logout
        if (token && isTokenExpired(token)) {
          logout({ redirect: false });
          return;
        }

        // Vérifie l'expiration du token toutes les heures
        const interval = setInterval(() => {
          const currentToken = localStorage.getItem('token');
          if (currentToken && isTokenExpired(currentToken))
            logout({ redirect: false });
        }, 3600000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Init uniquement si non initialisé
    if (!initialized) init();
    else setLoading(false);
  }, [initialized, token, logout, loadUserDataFromLocalStorage]);

  if (loading) return <LoadingPage />;
  return <>{children}</>;
}
*/

'use client';

import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import LoadingPage from '@/components/LoadingPage';
import { useLogoutUser } from '@/hooks/useLogoutUser';
import { fetchCurrentUser } from '@/services/auth.service';

interface Props {
  children: React.ReactNode;
}

export default function AppInitializer({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const { initialized, loadUserDataFromLocalStorage } = useUserStore();
  const { logout } = useLogoutUser();

  useEffect(() => {
    const init = async () => {
      try {
        await loadUserDataFromLocalStorage(); // charge données user locales

        await fetchCurrentUser(); // vérifie token via /me
      } catch (error) {
        logout({ redirect: false }); // token invalide ou erreur => logout
      } finally {
        setLoading(false);
      }
    };

    if (!initialized) {
      init();
    } else {
      setLoading(false);
    }
  }, [initialized, loadUserDataFromLocalStorage, logout]);

  if (loading) return <LoadingPage />;
  return <>{children}</>;
}
