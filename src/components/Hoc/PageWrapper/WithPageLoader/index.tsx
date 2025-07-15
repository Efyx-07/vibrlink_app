import LoadingPage from '@/components/Layout/LoadingPage';
import { useEffect, useState } from 'react';

interface WithPageLoaderProps {
  children: React.ReactNode;
  loadingPageMention?: string;
}

// Wrappe chaque page de l'app et lui applique un chargement de transition
// Prend une props pour personnaliser la mention de chargement
// ===========================================================================================
export function WithPageLoader({
  children,
  loadingPageMention,
}: WithPageLoaderProps) {
  // Utilise le hook pour le chargement de la page
  const isContentVisible: boolean = usePageLoader();
  return (
    <>
      {isContentVisible ? (
        <>{children}</>
      ) : (
        <LoadingPage mention={loadingPageMention} />
      )}
    </>
  );
}

// Hook pour gèrer le chargement des pages
// ===========================================================================================
function usePageLoader() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  // Utilisation de useEffect pour éviter les effets de bords
  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setIsContentVisible(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return isContentVisible;
}
