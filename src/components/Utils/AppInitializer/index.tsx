'use client';

import { useCallback, useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import LoadingPage from '@/components/LoadingPage';
import { useLogoutUser } from '@/hooks/useLogoutUser';
import { validateUserSession } from '@/services/auth.service';

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
    console.log('🟡 [AppInit] Initialisation en cours...');
    try {
      // Charge les données utilisateurs avec la méthode du store
      console.log(
        '📦 [AppInit] Chargement données user depuis localStorage...',
      );
      await loadUserDataFromLocalStorage();

      // Récupère l'état de connexion après le chargement des données
      const { isLoggedIn } = useUserStore.getState();
      console.log('🔍 [AppInit] isLoggedIn après chargement:', isLoggedIn);

      // Si non connecté, ne fait rien
      if (!isLoggedIn) {
        console.log(
          '❕ [AppInit] Utilisateur non connecté → skip session validation',
        );
        return;
      }

      // Si oui, vérifie la session (validité du token)
      console.log('🔐 [AppInit] Vérification session utilisateur...');
      await validateUserSession();
      console.log('✅ [AppInit] Session valide');
    } catch {
      // Redirige si un token était présent mais invalide
      console.warn(
        '❌ [AppInit] Erreur lors de la vérification du token, déconnexion...',
      );
      logout({ redirect: true });
    } finally {
      console.log('🟢 [AppInit] Initialisation terminée');
      setLoading(false);
    }
  }, [loadUserDataFromLocalStorage, logout]);

  useEffect(() => {
    if (!initialized) {
      console.log('📥 [AppInit] Store non initialisé → lancement init()');
      init();
    } else {
      console.log('📦 [AppInit] Store déjà initialisé');
      setLoading(false);
    }

    // Revalidation toutes les heures si utilisateur connecté
    const intervalId: NodeJS.Timeout = setInterval(async () => {
      const { isLoggedIn } = useUserStore.getState();
      console.log(
        '🔁 [AppInit] Revalidation périodique. isLoggedIn:',
        isLoggedIn,
      );

      if (!isLoggedIn) return;

      try {
        await validateUserSession();
        console.log('✅ [AppInit] Revalidation OK');
      } catch {
        console.warn('❌ [AppInit] Revalidation échouée, déconnexion...');
        logout({ redirect: true });
      }
    }, 3600000); // 1h

    return () => {
      clearInterval(intervalId);
      console.log('🧹 [AppInit] Nettoyage intervalle de revalidation');
    };
  }, [initialized, init, logout]);

  if (loading) {
    console.log('⏳ [AppInit] Chargement en cours...');
    return <LoadingPage />;
  }

  console.log('🧩 [AppInit] App prête, rendu des enfants');
  return <>{children}</>;
}
