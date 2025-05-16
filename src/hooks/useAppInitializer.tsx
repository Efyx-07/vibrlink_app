import { useEffect, useRef, useState } from 'react';
import useUserStore from '@/stores/userStore';
import isTokenExpired from '@/utils/checkTokenExpiry';

// Hook qui initialise l'application avec les données de l'utilisateur
// ===========================================================================================
export default function useAppInitializer(): boolean {
  const [loading, setLoading] = useState<boolean>(true);

  const appInitializationLoading: boolean = useAppInitialization();
  useTokenExpirationCheck();

  useEffect(() => {
    setLoading(appInitializationLoading);
  }, [appInitializationLoading]);

  return loading;
}

// Hook qui charge les données de l'utilisateur depuis le localStorage (si un token est présent)
// ===========================================================================================
function useAppInitialization(): boolean {
  const userStoreRef = useRef(useUserStore());
  const [loading, setLoading] = useState<boolean>(true);

  // get the datas before app initialisation
  useEffect(() => {
    const initApp = async (): Promise<void> => {
      try {
        await userStoreRef.current.loadUserDataFromLocalStorage();
        const token = localStorage.getItem('token');

        if (token) userStoreRef.current.setToken(token);
      } catch (error) {
        console.error('Error while fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  return loading;
}

// Hook qui vérifie si le token est expiré toutes les heures
// ===========================================================================================
function useTokenExpirationCheck(): void {
  const userStore = useUserStore();

  useEffect(() => {
    const checkToken = (): void => {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        userStore.logOutUser();
      }
    };

    checkToken();

    const checkTokenExpiration = setInterval(checkToken, 3600000);
    return () => clearInterval(checkTokenExpiration);
  }, [userStore]);
}
