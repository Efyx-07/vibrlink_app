import { useState, useEffect, useRef, RefObject } from 'react';
import { Platform } from '@/interfaces/release.interface';

interface UseVisibilityStateParams {
  platforms: Platform[];
  triggerUpdate: () => void;
}

// Hook pour gérer l'état de visibilité des plateformes
// ===========================================================================================
export default function useVisibilityState({
  platforms,
  triggerUpdate,
}: UseVisibilityStateParams) {
  // État pour la visibilité des plateformes
  const [platformsVisibility, setPlatformsVisibility] = useState<{
    [key: Platform['platformId']]: Platform['platformVisibility'];
  }>({});

  // Référence pour vérifier si le hook a été initialisé
  const isInitialized: RefObject<boolean> = useRef(false);

  // Effet pour initialiser la visibilité des plateformes
  useEffect(() => {
    if (!isInitialized.current) {
      setPlatformsVisibility(createInitialVisibility(platforms));
      isInitialized.current = true;
    }
  }, [platforms]);

  // Fonction pour gérer le changement de visibilité
  const handleVisibilityChange = (
    platformId: number,
    checked: boolean,
  ): void => {
    setPlatformsVisibility((prevVisibilityStatus) => ({
      ...prevVisibilityStatus,
      [platformId]: checked,
    }));
    triggerUpdate(); // Signale au parent qu'il faut lancer la mutation
  };
  // ===========================================================================================

  return {
    platformsVisibility,
    handleVisibilityChange,
  };
}

// Crée un objet de visibilité initial pour les plateformes
// ===========================================================================================
function createInitialVisibility(platforms: Platform[]): {
  [key: Platform['platformId']]: Platform['platformVisibility'];
} {
  const visibility: {
    [key: Platform['platformId']]: Platform['platformVisibility'];
  } = {};
  platforms.forEach((platform) => {
    visibility[platform.platformId] = platform.platformVisibility;
  });
  return visibility;
}
